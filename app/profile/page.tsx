
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { loadCart, saveCart, type CartItem } from "@/lib/cart";

type ProfileInfo = {
  name: string;
  email: string;
  phone: string;
};

type Address = {
  id: string;
  label: string;
  address: string;
  phone: string;
  isDefault: boolean;
};

type WishlistItem = {
  id: number | string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  emoji?: string;
};

type OrderItem = {
  id?: number | string;
  sku?: string;
  name: string;
  brand?: string;
  category?: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  status: string;
  date: string;
  items: OrderItem[];
  total: number;
  payment?: string;
  customer?: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
};
// CartItem imported from @/lib/cart

const ORDERS_KEY = "autopro-orders";
const WISHLIST_KEY = "autopro-wishlist";

const defaultProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+92 300 1234567",
};

const defaultAddress = {
  id: "default-home",
  label: "Home",
  address: "House 123, Main Road, Multan, Punjab, Pakistan",
  phone: "+92 300 1234567",
  isDefault: true,
};

const defaultWishlist: WishlistItem[] = [];

const orderSteps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Delivered",
];

function formatOrderDate(dateValue: string) {
  if (!dateValue) return "Date unavailable";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return String(dateValue);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function normalizeAddresses(savedAddresses: unknown): Address[] {
  const validAddresses = Array.isArray(savedAddresses)
    ? savedAddresses.filter(
        (address) =>
          address &&
          typeof address.id === "string" &&
          typeof address.label === "string" &&
          typeof address.address === "string" &&
          typeof address.phone === "string"
      )
    : [];

  const savedHome = validAddresses.find(
    (address) => address.id === defaultAddress.id
  );

  return [
    { ...(savedHome || defaultAddress), isDefault: true },
    ...validAddresses
      .filter((address) => address.id !== defaultAddress.id)
      .map((address) => ({ ...address, isDefault: false })),
  ];
}

function normalizeWishlist(items: unknown): WishlistItem[] {
  if (!Array.isArray(items)) return [];

  return items.filter(
    (item) =>
      item &&
      item.sku &&
      typeof item.name === "string" &&
      typeof item.price === "number"
  );
}

function normalizeOrders(items: unknown): Order[] {
  if (!Array.isArray(items)) return [];

  return items.filter(
    (order) =>
      order &&
      typeof order.id === "string" &&
      typeof order.status === "string" &&
      typeof order.total === "number" &&
      Array.isArray(order.items)
  );
}

function getStatusStyle(status: string): string {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Processing":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileInfo>(defaultProfile);
  const [formData, setFormData] = useState<ProfileInfo>(defaultProfile);

  const [addresses, setAddresses] = useState<Address[]>([defaultAddress]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState<{
    label: string;
    address: string;
    phone: string;
  }>({
    label: "Home",
    address: "",
    phone: "",
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(defaultWishlist);
  const [orders, setOrders] = useState<Order[]>([]);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("autopro-profile");
      const savedAddresses = localStorage.getItem("autopro-addresses");
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      const savedOrders = localStorage.getItem(ORDERS_KEY);

      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);

        if (
          parsedProfile &&
          typeof parsedProfile.name === "string" &&
          typeof parsedProfile.email === "string" &&
          typeof parsedProfile.phone === "string"
        ) {
          setProfile(parsedProfile);
          setFormData(parsedProfile);
        }
      }

      let parsedAddresses = [defaultAddress];

      if (savedAddresses) {
        try {
          parsedAddresses = JSON.parse(savedAddresses);
        } catch {
          parsedAddresses = [defaultAddress];
        }
      }

      const normalizedAddresses = normalizeAddresses(parsedAddresses);
      setAddresses(normalizedAddresses);

      localStorage.setItem(
        "autopro-addresses",
        JSON.stringify(normalizedAddresses)
      );

      let parsedWishlist = defaultWishlist;

      if (savedWishlist !== null) {
        try {
          parsedWishlist = JSON.parse(savedWishlist);
        } catch {
          parsedWishlist = defaultWishlist;
        }
      }

      const normalizedWishlist = normalizeWishlist(parsedWishlist);
      setWishlist(normalizedWishlist);

      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(normalizedWishlist)
      );

      let parsedOrders = [];

      if (savedOrders) {
        try {
          parsedOrders = JSON.parse(savedOrders);
        } catch {
          parsedOrders = [];
        }
      }

      setOrders(normalizeOrders(parsedOrders));
    } catch (error) {
      console.error("Could not load saved information:", error);
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!selectedOrder) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedOrder(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedOrder]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      localStorage.setItem("autopro-profile", JSON.stringify(formData));
      setProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Could not save profile:", error);
      alert("Profile save nahi ho saka. Please try again.");
    }
  }

  function handleCancel() {
    setFormData(profile);
    setIsEditing(false);
  }

  
  function handleAddressChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setAddressForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleAddAddress(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();

    const trimmedAddress = addressForm.address.trim();
    const trimmedPhone = addressForm.phone.trim();

    if (!trimmedAddress || !trimmedPhone) {
      alert("Please enter the complete address and phone number.");
      return;
    }

    const newAddress = {
      id: `address-${Date.now()}`,
      label: addressForm.label.trim() || "Other",
      address: trimmedAddress,
      phone: trimmedPhone,
      isDefault: false,
    };

    const updatedAddresses = normalizeAddresses([
      ...addresses,
      newAddress,
    ]);

    try {
      localStorage.setItem(
        "autopro-addresses",
        JSON.stringify(updatedAddresses)
      );

      setAddresses(updatedAddresses);
      setAddressForm({
        label: "Home",
        address: "",
        phone: "",
      });
      setIsAddingAddress(false);
    } catch (error) {
      console.error("Could not save address:", error);
      alert("Address save nahi ho saka. Please try again.");
    }
  }

  function handleCancelAddress() {
    setAddressForm({
      label: "Home",
      address: "",
      phone: "",
    });
    setIsAddingAddress(false);
  }

  function handleRemoveAddress(id: string) {
    if (id === defaultAddress.id) {
      alert("The default Home address cannot be removed.");
      return;
    }

    if (!addresses.some((address) => address.id === id)) return;

    if (!window.confirm("Are you sure you want to remove this address?")) {
      return;
    }

    const updatedAddresses = normalizeAddresses(
      addresses.filter((address) => address.id !== id)
    );

    try {
      localStorage.setItem(
        "autopro-addresses",
        JSON.stringify(updatedAddresses)
      );
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Could not remove address:", error);
      alert("Address remove nahi ho saka. Please try again.");
    }
  }

  function handleRemoveWishlistItem(sku: string) {
    const updatedWishlist = wishlist.filter((item) => item.sku !== sku);

    try {
      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(updatedWishlist)
      );

      setWishlist(updatedWishlist);
      setWishlistMessage("Item removed from your wishlist.");
    } catch (error) {
      console.error("Could not update wishlist:", error);
      alert("Wishlist update nahi ho saki. Please try again.");
    }
  }

  function handleAddToCart(item: WishlistItem) {
    try {
      const cartItems: CartItem[] = loadCart();

      const existingItem = cartItems.find(
        (cartItem) => cartItem.sku === item.sku
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = cartItems.map((cartItem) =>
          cartItem.sku === item.sku
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      } else {
        updatedCart = [
          ...cartItems,
          {
            id: item.id,
            sku: item.sku,
            name: item.name,
            brand: item.brand,
            category: item.category,
            price: item.price,
            oldPrice: null,
            qty: 1,
          },
        ];
      }

      saveCart(updatedCart);
      setWishlistMessage(`${item.name} added to your cart.`);
    } catch (error) {
      console.error("Could not add item to cart:", error);
      alert("Item cart mein add nahi ho saka. Please try again.");
    }
  }

  function handleOpenOrder(order: Order) {
    setSelectedOrder(order);
  }

  function handleCloseOrder() {
    setSelectedOrder(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 w-full">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 text-sm text-slate-500">
          <Link href="/" className="cursor-pointer hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">My Profile</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-semibold">My Profile</h1>
          <p className="mt-2 text-slate-500">
            Manage your personal information and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Personal Information */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 md:col-span-1">
            <div className="mb-6 flex items-center justify-between gap-2">
              <h2 className="text-xl font-semibold">Personal Information</h2>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(true);
                  }}
                  className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
              )}
            </div>

            {!isEditing ? (
              <>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-blue-600">
                    {profile.name
                      .split(" ")
                      .filter(Boolean)
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold">{profile.name}</h3>
                    <p className="text-sm text-slate-500">Customer</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-500">Full Name</p>
                    <p className="mt-1 font-medium">{profile.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Email Address</p>
                    <p className="mt-1 break-words font-medium">{profile.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Phone Number</p>
                    <p className="mt-1 font-medium">{profile.phone}</p>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* My Orders */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 md:col-span-2">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">My Orders</h2>
              <span className="text-sm text-slate-500">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>

            {!storageLoaded ? (
              <p className="text-sm text-slate-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
                <h3 className="font-semibold">No orders yet</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Orders you place through Checkout will appear here.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">Order ID</p>
                        <p className="mt-1 break-all font-semibold">#{order.id}</p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="mt-4">
                      {order.items.map((item, index) => (
                        <div key={`${item.sku || item.name}-${index}`}>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      ))}

                      <p className="mt-2 text-sm text-slate-500">
                        Order Date: {formatOrderDate(order.date)}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <p className="font-semibold">
                        Rs. {order.total.toLocaleString("en-PK")}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleOpenOrder(order)}
                        className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Saved Addresses */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 md:col-span-3">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your delivery addresses.
                </p>
              </div>

              {!isAddingAddress && (
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(true)}
                  className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  + Add Address
                </button>
              )}
            </div>

            {isAddingAddress && (
              <form
                onSubmit={handleAddAddress}
                className="mb-6 rounded-lg border border-blue-200 bg-blue-50/50 p-4"
              >
                <h3 className="mb-4 font-semibold">Add New Address</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="address-label" className="mb-1 block text-sm font-medium">
                      Address Label
                    </label>
                    <select
                      id="address-label"
                      name="label"
                      value={addressForm.label}
                      onChange={handleAddressChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="address-phone" className="mb-1 block text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      id="address-phone"
                      name="phone"
                      type="tel"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                      placeholder="+92 300 1234567"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="full-address" className="mb-1 block text-sm font-medium">
                      Full Address
                    </label>
                    <textarea
                      id="full-address"
                      name="address"
                      value={addressForm.address}
                      onChange={handleAddressChange}
                      placeholder="House number, street, area, city..."
                      rows={3}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelAddress}
                    className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {!storageLoaded ? (
              <p className="text-sm text-slate-500">Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
                <p className="font-medium">No saved addresses yet.</p>
                <p className="mt-1 text-sm text-slate-500">
                  Click Add Address to save your first address.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {addresses.map((address) => (
                  <div key={address.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{address.label}</h3>
                      {address.isDefault && (
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-6 text-slate-600">{address.address}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Phone: {address.phone}
                    </p>

                    {!address.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAddress(address.id)}
                        className="mt-4 cursor-pointer text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove Address
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Wishlist */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 md:col-span-3">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">My Wishlist</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Spare parts you have saved for later.
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {wishlistMessage && (
              <div
                role="status"
                className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>{wishlistMessage}</span>
                  <button
                    type="button"
                    onClick={() => setWishlistMessage("")}
                    className="cursor-pointer font-medium hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {!storageLoaded ? (
              <p className="text-sm text-slate-500">Loading wishlist...</p>
            ) : wishlist.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
                <h3 className="font-semibold">Your wishlist is empty</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Items you save for later will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {wishlist.map((item) => (
                  <div key={item.sku} className="rounded-lg border border-slate-200 p-4">
                    <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-slate-100">
                      <span className="text-4xl" role="img" aria-label={item.category}>
                        {item.emoji || (item.brand === "Toyota" ? "🚗" : "🛠️")}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">
                      {item.brand} · {item.category}
                    </p>
                    <h3 className="mt-1 font-semibold">{item.name}</h3>
                    <p className="mt-2 font-semibold">
                      Rs. {item.price.toLocaleString("en-PK")}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveWishlistItem(item.sku)}
                        className="cursor-pointer rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Order Tracking Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
          onClick={handleCloseOrder}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="tracking-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-600">AutoPro Order</p>
                <h2 id="tracking-title" className="mt-1 text-2xl font-semibold">
                  Order Tracking
                </h2>
                <p className="mt-2 break-all text-sm text-slate-500">
                  Order #{selectedOrder.id}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseOrder}
                aria-label="Close order tracking"
                className="cursor-pointer rounded-full p-2 text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <div className="mb-6 rounded-xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Current Status</p>
                  <p className="mt-1 font-semibold">{selectedOrder.status}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(selectedOrder.status)}`}
                >
                  {selectedOrder.status === "Delivered" ? "Delivered" : "In Progress"}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Order Date: {formatOrderDate(selectedOrder.date)}
              </p>
            </div>

            <div className="mb-7">
              <h3 className="mb-5 font-semibold">Tracking Progress</h3>

              <div>
                {orderSteps.map((step, index) => {
                  const currentIndex = orderSteps.indexOf(selectedOrder.status);
                  const effectiveIndex = currentIndex === -1 ? 0 : currentIndex;
                  const isComplete = index <= effectiveIndex;
                  const isCurrent = index === effectiveIndex;

                  return (
                    <div key={step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                            isComplete
                              ? "bg-blue-600 text-white"
                              : "border-2 border-slate-200 bg-white text-slate-400"
                          }`}
                        >
                          {index < effectiveIndex ? "✓" : index + 1}
                        </div>

                        {index < orderSteps.length - 1 && (
                          <div
                            className={`h-10 w-0.5 ${
                              index < effectiveIndex ? "bg-blue-600" : "bg-slate-200"
                            }`}
                          />
                        )}
                      </div>

                      <div className="pb-8">
                        <p
                          className={`font-medium ${
                            isComplete ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {step}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {isCurrent
                            ? step === "Delivered"
                              ? "Your order has been delivered."
                              : step === "Order Placed"
                                ? "Your order request has been received."
                                : `Your order is currently ${step.toLowerCase()}.`
                            : index < effectiveIndex
                              ? "Completed"
                              : "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-5">
              <h3 className="mb-3 font-semibold">Order Details</h3>

              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={`${item.sku || item.name}-${index}`}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 text-slate-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 font-medium">
                      Rs. {(item.price * item.quantity).toLocaleString("en-PK")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="font-semibold">Total Amount</span>
                <span className="text-lg font-bold">
                  Rs. {selectedOrder.total.toLocaleString("en-PK")}
                </span>
              </div>

              {selectedOrder.payment && (
                <p className="mt-3 text-sm text-slate-500">
                  Payment Method:{" "}
                  {selectedOrder.payment === "cod" ? "Cash on Delivery" : "Bank Transfer"}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleCloseOrder}
              className="mt-6 w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
            >
              Close
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Frontend demo tracking. Order status is not automatically updated.
            </p>
          </section>
        </div>
      )}
      </main>
      <Footer />
    </div>
  );
}
