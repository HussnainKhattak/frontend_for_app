export interface ServicePackage {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "Starter & Alternator" | "Electrical & Diagnostics" | "Engine & Transmission" | "Brakes & Suspension" | "Routine Maintenance" | "AC & Climate Control";
  shortDescription: string;
  fullDescription: string;
  startingPrice: number; // In PKR
  estimatedTime: string;
  warranty: string;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  keySpecs: string;
  features: string[];
  symptoms: string[];
  processSteps: ServiceProcessStep[];
  packages: ServicePackage[];
  faqs: ServiceFAQ[];
}

export const WORKSHOP_SERVICES: ServiceItem[] = [
  {
    id: "starter-motor-repair",
    slug: "starter-motor-repair",
    title: "Starter Motor Diagnostics, Repair & Rebuild",
    category: "Starter & Alternator",
    shortDescription: "Specialized bench testing, armature rewinding, solenoid coil repair, and complete starter motor overhaul.",
    fullDescription: "Panjtan Pak Auto is the recognized regional leader in starter motor diagnostics, repair, and precision rebuilding. Using computerized test benches, we diagnose solenoid engagement failures, worn carbon brushes, pitted commutators, and weakened armatures. We restore your starter motor to original OEM specifications with a comprehensive warranty.",
    startingPrice: 3500,
    estimatedTime: "1 - 2 Hours",
    warranty: "6-Month Workshop Warranty",
    rating: 4.9,
    reviewsCount: 312,
    image: "/images/workshop/gallery-1.jpg",
    galleryImages: [
      "/images/workshop/gallery-1.jpg",
      "/images/workshop/gallery-2.jpg",
      "/images/workshop/gallery-4.jpg",
    ],
    keySpecs: "Computerized Bench Test · OEM Carbon Brushes · Solenoid Rebuild",
    features: [
      "Complete electrical bench testing under high starter load",
      "Heavy-duty copper armature inspection and rewinding",
      "Solenoid switch rebuild & high-temperature plunger replacement",
      "Heavy duty Bendix drive gear gear inspection and lubrication",
      "New OEM carbon brushes and heavy spring tensioners",
      "6-Month unlimited mileage workshop replacement warranty",
    ],
    symptoms: [
      "Single loud click sound when turning the ignition key",
      "Engine cranks very slowly or struggles to turn over",
      "Intermittent starting failure (starts fine when cold, fails when warm)",
      "Grinding metallic noise upon key ignition",
      "Dashboard lights dim heavily during startup attempts",
      "Smoke or burnt electrical odor from the lower engine bay",
    ],
    processSteps: [
      {
        step: 1,
        title: "In-Bay Electrical & Drop-Voltage Test",
        description: "We check the battery terminal voltage, ignition switch signal, and starter cable drop before dismounting.",
      },
      {
        step: 2,
        title: "Disassembly & Micro-Bench Inspection",
        description: "Full teardown to inspect armature coils, commutator grooving, field coils, and brush holders.",
      },
      {
        step: 3,
        title: "Precision Component Overhaul",
        description: "Commutator resurfacing on a high-precision lathe, new OEM carbon brushes, and high-temp solenoid rebuild.",
      },
      {
        step: 4,
        title: "High-Load Simulator & Re-installation",
        description: "Dyno bench simulation under 300+ Amp load followed by installation, torque checking, and final vehicle start verification.",
      },
    ],
    packages: [
      {
        name: "Quick Inspection & Brush Service",
        price: 3500,
        description: "Ideal for early-stage starting issues with healthy armatures.",
        features: [
          "Complete dismounting & bench diagnostic",
          "Carbon brush set replacement",
          "Commutator polishing & cleanout",
          "Bendix gear cleaning and greasing",
          "1-Month Workmanship Warranty",
        ],
      },
      {
        name: "Complete Overhaul & Rebuild",
        price: 7500,
        description: "Our most popular service restoring 100% cranking power.",
        popular: true,
        features: [
          "All Quick Inspection features included",
          "New heavy-duty OEM Solenoid switch",
          "Armature rewinding / balancing",
          "Sealed high-temp drive bearings",
          "Full load bench testing certificate",
          "6-Month Workshop Warranty",
        ],
      },
      {
        name: "Brand New Genuine Unit Replacement",
        price: 18500,
        description: "Direct OEM new starter unit with factory warranty.",
        features: [
          "Original OEM imported starter motor",
          "Complete electrical wiring check",
          "Relay & fuse terminal overhaul",
          "Zero turn-around waiting time",
          "1-Year Genuine Factory Guarantee",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a starter motor repair usually take?",
        answer: "Most starter motor repairs and brush replacements are completed in 90 minutes to 2 hours at our dedicated workshop bench.",
      },
      {
        question: "Can you rebuild starter motors for imported and Japanese cars?",
        answer: "Yes, Panjtan Pak Auto specializes in Toyota, Honda, Suzuki, Nissan, Daihatsu, BMW, Mercedes, and commercial diesel starters.",
      },
      {
        question: "Is it better to repair or buy a brand new starter?",
        answer: "In 85% of cases, an expert rebuild with OEM copper coils and new carbon brushes gives factory-grade performance at less than 40% of the cost of a new unit.",
      },
    ],
  },
  {
    id: "alternator-testing-rewinding",
    slug: "alternator-testing-rewinding",
    title: "Alternator Diagnostics, Stator Rewinding & Regulator Repair",
    category: "Starter & Alternator",
    shortDescription: "Precision charging system analysis, rectifier diode testing, stator rewinding, and IC voltage regulator replacement.",
    fullDescription: "Your vehicle's alternator powers all electronics and recharges the battery while running. Panjtan Pak Auto offers specialized alternator restoration: bench testing high-amp output, replacing burned rectifier diode plates, replacing internal IC regulators, and rewinding stator coils with Grade-H copper wire.",
    startingPrice: 4000,
    estimatedTime: "2 - 3 Hours",
    warranty: "6-Month Workshop Warranty",
    rating: 4.95,
    reviewsCount: 284,
    image: "/images/workshop/gallery-2.jpg",
    galleryImages: [
      "/images/workshop/gallery-2.jpg",
      "/images/workshop/gallery-1.jpg",
      "/images/workshop/gallery-3.jpg",
    ],
    keySpecs: "14.4V Voltage Stability · Rectifier Diode Overhaul · High-Amp Bench Test",
    features: [
      "Full load current output testing (60A to 180A specs)",
      "High-speed diode bridge and avalanche rectifier testing",
      "OEM IC regulator replacement for exact 13.8V - 14.5V output",
      "Pure copper stator and rotor coil rewinding",
      "Precision low-noise Japanese ball bearings replacement",
      "Pulley freewheel clutch inspection and alignment",
    ],
    symptoms: [
      "Red battery warning indicator illuminated on speedometer",
      "Headlights and interior dashboard illumination flickering or dimming",
      "Car battery repeatedly dies despite being brand new",
      "Whining or squealing high-pitch noise from drive belt area",
      "Overcharging smelling like rotten eggs / boiling battery acid",
      "AC blower and power windows slowing down at traffic idle",
    ],
    processSteps: [
      {
        step: 1,
        title: "Digital Charging Analysis",
        description: "Oscilloscope check to measure voltage ripple, alternating current leakage, and loaded charging voltage.",
      },
      {
        step: 2,
        title: "Dismantling & Component Segregation",
        description: "De-soldering stator connections to independently test each diode in the rectifier bridge.",
      },
      {
        step: 3,
        title: "Regulator & Bearing Replacement",
        description: "Installing brand new OEM voltage regulator, high-grade carbon brushes, and high-RPM NSK/Koyo bearings.",
      },
      {
        step: 4,
        title: "Full Amperage Dynamometer Test",
        description: "Spinning unit up to 6,000 RPM on test bench while applying resistance load to verify peak amperage.",
      },
    ],
    packages: [
      {
        name: "Standard Voltage Regulator & Bearing Service",
        price: 4000,
        description: "Fixes flickering lights, battery light on dash, and bearing whining.",
        features: [
          "Complete dismounting & bench analysis",
          "New Japanese front & rear bearings",
          "Slip ring resurfacing and brush set",
          "Charging rate calibration",
          "3-Month Workshop Warranty",
        ],
      },
      {
        name: "Comprehensive Overhaul & Rectifier Rebuild",
        price: 8500,
        description: "Complete overhaul recommended for heavy electronic or AC load.",
        popular: true,
        features: [
          "Everything in Standard Service",
          "Heavy-duty Diode Rectifier pack replacement",
          "Brand new OEM IC Voltage Regulator",
          "Stator insulation revarnish and bake",
          "Full 6-Month Replacement Warranty",
        ],
      },
      {
        name: "High-Amp Reconditioned / New Unit",
        price: 22000,
        description: "Complete replacement unit matching genuine Japanese/European spec.",
        features: [
          "Original OEM high-amperage alternator",
          "Serpentine belt tensioner check",
          "Battery terminal post upgrade",
          "1-Year Comprehensive Guarantee",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my battery drain even when the battery is brand new?",
        answer: "If your alternator's diode pack or regulator fails, the alternator cannot recharge the battery, or worse, a shorted diode drains battery current overnight.",
      },
      {
        question: "Can an overcharging alternator damage car computers (ECU)?",
        answer: "Yes, an alternator producing above 15.0 Volts can fry sensitive ECUs, audio systems, and sensor modules. We calibrate regulators to a safe 14.2V - 14.4V.",
      },
    ],
  },
  {
    id: "computerized-engine-diagnostics",
    slug: "computerized-engine-diagnostics",
    title: "Computerized OBD-II Diagnostics & Electrical Scan",
    category: "Electrical & Diagnostics",
    shortDescription: "Advanced dealer-level OBD-II scanning, live sensor telemetry, ECU fault decoding, and electrical trouble diagnosis.",
    fullDescription: "Modern vehicles rely on intricate electronic control modules. Our master automotive electricians use state-of-the-art diagnostic scanners (Autel MaxiSys & Launch X431) to communicate directly with your ECU, TCU, ABS, and SRS computers, isolating elusive sensor anomalies, misfires, and short circuits.",
    startingPrice: 2000,
    estimatedTime: "45 Mins",
    warranty: "Diagnostic Accuracy Guarantee",
    rating: 4.9,
    reviewsCount: 198,
    image: "/images/workshop/gallery-4.jpg",
    galleryImages: [
      "/images/workshop/gallery-4.jpg",
      "/images/workshop/gallery-3.jpg",
      "/images/workshop/gallery-2.jpg",
    ],
    keySpecs: "OBD-II Multi-System Scan · Live Data Waveforms · Bi-Directional Actuation",
    features: [
      "Full ECU, Transmission, ABS, Airbag, and BCM scanner interrogations",
      "Live data stream logging (O2 sensors, MAF, fuel trim, ignition advance)",
      "Bi-directional component triggering (fuel pump, cooling fan, relays)",
      "Wiring continuity and pin-out voltage verification",
      "Printed diagnostic report with verified technician remediation steps",
    ],
    symptoms: [
      "Check Engine light flashing or solidly lit on cluster",
      "Sudden loss of acceleration or engine entering 'Limp Mode'",
      "Excessive fuel consumption and black tailpipe smoke",
      "Engine misfiring, vibrating, or erratic idling",
      "Traction control, ABS, or battery warning icons lit",
    ],
    processSteps: [
      {
        step: 1,
        title: "OBD-II Port Interface & System Read",
        description: "Connecting diagnostic hardware to read all active, pending, and permanent DTC fault codes.",
      },
      {
        step: 2,
        title: "Live Data Analysis Under Running Conditions",
        description: "Monitoring live fuel trim ratios, throttle position sensor response, and alternator input voltage.",
      },
      {
        step: 3,
        title: "Physical Sensor & Wiring Pin-Check",
        description: "Confirming whether the trouble code is caused by a failing sensor, loose ground, or torn harness.",
      },
      {
        step: 4,
        title: "Clear Codes & Verification Drive",
        description: "Resetting modules, executing adaptions, and confirming proper trouble-free readiness monitors.",
      },
    ],
    packages: [
      {
        name: "Standard Scan & Fault Code Report",
        price: 2000,
        description: "Quick check to know exactly why your Check Engine light is on.",
        features: [
          "All-system ECU trouble code scan",
          "Fault code explanation by technician",
          "Code clearing and reset",
          "Printed / Digital diagnostic sheet",
        ],
      },
      {
        name: "Deep Electrical Live Diagnostics",
        price: 4500,
        description: "Comprehensive live sensor analysis and multimeter circuit check.",
        popular: true,
        features: [
          "All Standard Scan features",
          "Live sensor waveform testing",
          "Wiring harness resistance & drop test",
          "Actuator & relay component triggering",
          "Repair recommendation roadmap",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I drive if my Check Engine light is on?",
        answer: "If the light is steady, you can drive safely to our workshop. However, if the Check Engine light is blinking, pull over immediately as it indicates an active misfire that can destroy the catalytic converter.",
      },
    ],
  },
  {
    id: "battery-health-electrical-system",
    slug: "battery-health-electrical-system",
    title: "Battery Health Testing, Terminal Restoration & Parasitic Drain Check",
    category: "Electrical & Diagnostics",
    shortDescription: "Complete CCA conductance test, terminal post corrosion cleanup, alternator charging evaluation, and dark current leak test.",
    fullDescription: "A healthy battery requires a clean electrical path. We conduct professional Cold Cranking Amp (CCA) health tests, clean acid sulfation off terminal clamps, replace corroded lead battery terminals, and perform dark-current parasitic drain checks to discover what is draining your battery overnight.",
    startingPrice: 1500,
    estimatedTime: "30 - 45 Mins",
    warranty: "100% Diagnostic Accuracy",
    rating: 4.85,
    reviewsCount: 165,
    image: "/images/workshop/gallery-3.jpg",
    galleryImages: [
      "/images/workshop/gallery-3.jpg",
      "/images/workshop/gallery-4.jpg",
      "/images/workshop/gallery-1.jpg",
    ],
    keySpecs: "CCA Conductance · Dark Current Leak Check · Anti-Corrosion Treatment",
    features: [
      "Digital conductance tester measuring internal cell resistance & CCA",
      "Micro-amp multimeter parasitic drain test for overnight battery drain",
      "Brass / heavy lead terminal clamp upgrade with dielectric sealing",
      "Battery tray anti-acid neutralization wash",
      "Alternator charging circuit voltage drop test under headlamp & AC load",
    ],
    symptoms: [
      "Battery goes flat after sitting parked for 1 or 2 days",
      "White, blue, or green crusty acid powder around battery terminals",
      "Sluggish crank on chilly mornings",
      "Digital clock or stereo resets every time car starts",
      "Swollen battery plastic casing",
    ],
    processSteps: [
      {
        step: 1,
        title: "Cold Cranking Amps Test",
        description: "Measuring battery health percentage vs OEM factory CCA rating.",
      },
      {
        step: 2,
        title: "Parasitic Dark Drain Measurement",
        description: "Checking quiescent current with car turned off (should be under 50mA).",
      },
      {
        step: 3,
        title: "Terminal Cleaning & Replacement",
        description: "Treating terminals with neutralizing compound and installing fresh high-conductivity clamps.",
      },
      {
        step: 4,
        title: "Full Charging System Check",
        description: "Verifying alternator replenishes battery accurately without over-voltage.",
      },
    ],
    packages: [
      {
        name: "Basic Battery & Terminal Service",
        price: 1500,
        description: "Standard terminal restoration & battery health evaluation.",
        features: [
          "Digital conductance & health check",
          "Terminal acid cleaning & grease seal",
          "Alternator output verification",
        ],
      },
      {
        name: "Full Parasitic Drain & Circuit Overhaul",
        price: 3500,
        description: "In-depth electrical inspection for stubborn battery draining issues.",
        popular: true,
        features: [
          "Complete milliamp fuse-by-fuse dark leak test",
          "Heavy-duty brass terminal replacement",
          "Ground cable resistance test",
          "Starter load voltage dip calculation",
        ],
      },
    ],
    faqs: [
      {
        question: "What is an acceptable dark battery drain?",
        answer: "A normal modern car with an alarm and clock draws between 20mA and 45mA. Anything over 70mA will empty your battery in 48 hours.",
      },
    ],
  },
  {
    id: "complete-periodic-maintenance",
    slug: "complete-periodic-maintenance",
    title: "Complete Periodic Maintenance & 32-Point Inspection",
    category: "Routine Maintenance",
    shortDescription: "Comprehensive vehicle tune-up: engine oil flush, spark plugs, air/cabin filters, brake inspection, and suspension safety check.",
    fullDescription: "Our comprehensive 32-point workshop tune-up ensures complete peace of mind. We inspect all fluid levels, brake linings, suspension bushings, coolant freeze point, drive belts, and replace worn filters using premium OEM-grade fluids tailored to Pakistan's driving conditions.",
    startingPrice: 4500,
    estimatedTime: "2 Hours",
    warranty: "30-Day AutoPro Guarantee",
    rating: 4.9,
    reviewsCount: 420,
    image: "/images/workshop/gallery-5.jpg",
    galleryImages: [
      "/images/workshop/gallery-5.jpg",
      "/images/workshop/gallery-6.jpg",
      "/images/workshop/network-facility.jpg",
    ],
    keySpecs: "32-Point Check · Fully Synthetic Oil · OEM Filters · Brake Safety",
    features: [
      "Full synthetic engine oil replacement & genuine oil filter",
      "Air filter & AC cabin antibacterial filter replacement",
      "Spark plug inspection, gap calibration, and electrode cleaning",
      "Coolant, brake fluid, power steering, and transmission fluid inspection",
      "Under-chassis suspension, tie rods, ball joints, and boot inspection",
      "Brake caliper servicing, pad thickness gauge measurement, and tire rotation",
    ],
    symptoms: [
      "Mileage interval reached (every 5,000 km or 10,000 km)",
      "Car feels sluggish and hesitates under throttle acceleration",
      "Dark, gritty engine oil on the dipstick",
      "Reduced fuel average in city driving",
      "Preparing for a long inter-city highway trip",
    ],
    processSteps: [
      {
        step: 1,
        title: "Receiving & Multi-Point Underhood Inspection",
        description: "Checking belts, hoses, fluids, and battery before placing car on the lift.",
      },
      {
        step: 2,
        title: "Engine Oil Drain & Filter Replacement",
        description: "Warm oil drain, magnetic plug cleanup, and installing fresh genuine filter with synthetic oil.",
      },
      {
        step: 3,
        title: "Brake Servicing & Wheel Hub Inspection",
        description: "Brake dust cleanup, slide pin lubrication, and tire pressure calibration.",
      },
      {
        step: 4,
        title: "Throttle Clean, Diagnostics & Road Test",
        description: "Clearing throttle body carbon deposits, ECU reset, and final test drive.",
      },
    ],
    packages: [
      {
        name: "Standard Tune-Up (Labor & Inspection)",
        price: 4500,
        description: "Complete labor for 32-point checkup, brake cleaning, and filter replacements (fluids cost extra).",
        features: [
          "Complete 32-point inspection",
          "All 4 wheels brake servicing",
          "Throttle body cleaning",
          "Spark plug cleaning & gapping",
          "Coolant & fluid top-ups",
        ],
      },
      {
        name: "Gold Package (With Synthetic Oil & Filters Included)",
        price: 13500,
        description: "Complete package including 4L Fully Synthetic Engine Oil and OEM filters.",
        popular: true,
        features: [
          "All Standard Tune-Up services",
          "4 Litres Premium Fully Synthetic Oil (5W-30 / 0W-20)",
          "Original OEM Engine Oil Filter",
          "Original Engine Air Filter",
          "Full Electronic Diagnostic Scan",
          "30-Day Workshop Guarantee",
        ],
      },
      {
        name: "Platinum Ultimate Care Package",
        price: 24000,
        description: "Full periodic maintenance plus transmission oil, brake fluid flush, and AC gas recharge.",
        features: [
          "All Gold Package features",
          "Complete Brake Fluid Flush (DOT 4)",
          "Transmission / CVT Oil Level Check & Topup",
          "Cabin AC Filter replacement",
          "Complete Engine Bay Detailing & Protective Coating",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should I bring my car for periodic maintenance?",
        answer: "For city stop-and-go driving in Pakistan, we recommend periodic maintenance every 5,000 km or 6 months, whichever comes first.",
      },
    ],
  },
  {
    id: "brake-system-repair-pad-replacement",
    slug: "brake-system-repair-pad-replacement",
    title: "Brake System Service, Ceramic Pads & Rotor Resurfacing",
    category: "Brakes & Suspension",
    shortDescription: "Precision brake caliper servicing, ceramic brake pad replacement, disc rotor lathe resurfacing, and ABS bleeding.",
    fullDescription: "Your vehicle's braking system is vital for your safety. Our workshop technicians inspect disc rotor run-out with dial indicators, replace low-noise ceramic brake pads, rebuild caliper piston seals, and flush brake fluid using pressurized bleeding machines.",
    startingPrice: 3000,
    estimatedTime: "1 - 1.5 Hours",
    warranty: "6-Month / 10,000 KM Warranty",
    rating: 4.9,
    reviewsCount: 310,
    image: "/images/workshop/gallery-6.jpg",
    galleryImages: [
      "/images/workshop/gallery-6.jpg",
      "/images/workshop/gallery-5.jpg",
      "/images/workshop/gallery-1.jpg",
    ],
    keySpecs: "Low-Dust Ceramic Pads · Rotor Resurfacing · High-Temp Caliper Grease",
    features: [
      "Front and rear brake caliper inspection and high-temperature silicone greasing",
      "Premium low-dust ceramic brake pads installation",
      "On-car / Off-car precision disc rotor resurfacing to eliminate vibration",
      "Brake master cylinder pressure and booster vacuum test",
      "DOT 4 high-temp brake fluid flush and automated ABS pump bleeding",
    ],
    symptoms: [
      "High-pitched squealing or metal-on-metal grinding when braking",
      "Steering wheel shudders or vibrates heavily during high-speed braking",
      "Brake pedal feels spongy, soft, or sinks slowly to the floorboard",
      "Car pulls to the left or right when applying brakes",
      "Handbrake requires pulling all the way to the top to hold the car",
    ],
    processSteps: [
      {
        step: 1,
        title: "Brake Pad & Rotor Thickness Measurement",
        description: "Checking pad lining depth (replace if under 3mm) and rotor minimum thickness with micrometer.",
      },
      {
        step: 2,
        title: "Rotor Resurfacing / Polishing",
        description: "Truing up brake discs on a precision lathe to remove lip grooves and brake judder warp.",
      },
      {
        step: 3,
        title: "Caliper Hardware Servicing & Pad Fitting",
        description: "Cleaning bracket guide clips, lubricating slide pins, and seating anti-rattle shims.",
      },
      {
        step: 4,
        title: "Fluid Bleed & Dynamic Stopping Test",
        description: "Bleeding trapped air pockets from hydraulic lines followed by deceleration road test.",
      },
    ],
    packages: [
      {
        name: "Standard Front Brake Pad Replacement (Labor Only)",
        price: 3000,
        description: "Labor service for replacing front brake pads with full caliper cleaning.",
        features: [
          "Brake caliper removal & inspection",
          "Slide pin greasing with silicone grease",
          "Brake fluid level check",
          "Brake dust cleanup",
        ],
      },
      {
        name: "Complete Front & Rear Ceramic Overhaul",
        price: 9500,
        description: "Includes high quality ceramic pads and disc rotor resurfacing.",
        popular: true,
        features: [
          "Premium low-noise Ceramic brake pad set",
          "Both front disc rotors precision resurfaced",
          "Rear brake shoe / pad service and adjustment",
          "Handbrake cable tension calibrated",
          "6-Month Warranty",
        ],
      },
      {
        name: "Master Cylinder & Hydraulic Overhaul",
        price: 16000,
        description: "Complete brake hydraulic overhaul including fluid flush and seals.",
        features: [
          "Full DOT 4 Brake Fluid flush",
          "Caliper piston seals and rubber boots replacement",
          "Vacuum brake booster check",
          "ABS electronic valve cycle test",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my steering wheel shake when I brake at high speed?",
        answer: "This is caused by warped brake disc rotors due to intense heat cycles. Resurfacing the rotors on our precision lathe eliminates this wobble completely.",
      },
    ],
  },
  {
    id: "car-ac-service-compressor-repair",
    slug: "car-ac-service-compressor-repair",
    title: "Car AC Complete Service, Gas Recharge & Compressor Repair",
    category: "AC & Climate Control",
    shortDescription: "Nitrogen leak pressure testing, OEM R134a refrigerant recharge, AC compressor clutch magnetic coil repair, and cooling coil service.",
    fullDescription: "Beat the summer heat with our master auto climate technicians. We perform high-pressure nitrogen leak detection, vacuum evacuation of moisture, replacement of compressor magnetic clutches and control valves, and injection of UV dye and PAG compressor oil for icy cold cabin cooling.",
    startingPrice: 3500,
    estimatedTime: "1 - 2 Hours",
    warranty: "90-Day Cooling Guarantee",
    rating: 4.88,
    reviewsCount: 265,
    image: "/images/workshop/network-facility.jpg",
    galleryImages: [
      "/images/workshop/network-facility.jpg",
      "/images/workshop/gallery-2.jpg",
      "/images/workshop/gallery-4.jpg",
    ],
    keySpecs: "Pure R134a Gas · Nitrogen Leak Pressure Test · PAG Oil Lubrication",
    features: [
      "Digital electronic manifold pressure analysis (Low & High sides)",
      "High-pressure nitrogen leak testing of hoses, condenser, and cooling coil",
      "Deep vacuum moisture removal before gas charging",
      "Original virgin R134a refrigerant charge to precise manufacturer gram specs",
      "Fresh synthetic PAG compressor oil injection to protect compressor pistons",
      "Cabin antibacterial foam evaporator sanitization",
    ],
    symptoms: [
      "AC blows warm or room-temperature air when car is idling",
      "AC cools fine on highway but stops cooling in heavy city traffic",
      "Hissing noise from under the dashboard when AC is turned on",
      "Musty, damp, or foul odor coming from dashboard air vents",
      "Compressor clicks on and off constantly every 5 seconds (rapid cycling)",
    ],
    processSteps: [
      {
        step: 1,
        title: "Gauge Pressure & Temperature Audit",
        description: "Measuring vent center temperature (target: 4°C - 7°C) and compressor compression ratios.",
      },
      {
        step: 2,
        title: "Nitrogen Pressure Leak Check",
        description: "Pressurizing system with 250 PSI nitrogen to verify zero pinhole leaks in seals and condenser.",
      },
      {
        step: 3,
        title: "Vacuum Evacuation & Oil Topup",
        description: "Running rotary vacuum pump for 25 minutes to boil off all moisture and adding fresh PAG oil.",
      },
      {
        step: 4,
        title: "Precision Refrigerant Charging",
        description: "Charging virgin R134a refrigerant on digital weight scales and testing cooling under full sun load.",
      },
    ],
    packages: [
      {
        name: "Standard AC Refresh & Gas Recharge",
        price: 4500,
        description: "Vacuum check, synthetic PAG oil, and pure R134a refrigerant charge.",
        features: [
          "Vacuum test & leak detection",
          "Fresh PAG 46/100 compressor oil",
          "Pure R134a gas recharge",
          "Cabin temperature check",
          "30-Day Cooling Warranty",
        ],
      },
      {
        name: "Complete Climate Overhaul & Condenser Wash",
        price: 8500,
        description: "Includes high pressure condenser chemical wash, leak detection, and new cabin filter.",
        popular: true,
        features: [
          "All Standard AC Refresh features",
          "External condenser chemical foam flush",
          "New Activated Carbon Cabin Filter",
          "Antibacterial vent sanitization",
          "90-Day Cooling Guarantee",
        ],
      },
      {
        name: "Compressor Clutch / Valve Repair",
        price: 14500,
        description: "Fixes clicking, seized, or weak compressor performance without buying a costly new unit.",
        features: [
          "Compressor dismounting and bench inspection",
          "New electromagnetic clutch coil & bearing",
          "Electronic displacement control valve replacement",
          "Full refrigerant charge included",
          "6-Month Workshop Warranty",
        ],
      },
    ],
    faqs: [
      {
        question: "Why does my AC cooling drop when the car is stopped in traffic?",
        answer: "This is usually caused by either a dirty condenser radiator blocking airflow, a slow radiator fan motor, or a weak compressor that cannot build pressure at low RPM.",
      },
    ],
  },
  {
    id: "engine-tuneup-transmission-service",
    slug: "engine-tuneup-transmission-service",
    title: "Engine Tune-Up, Fuel Injector Ultrasonic Cleaning & Transmission Flush",
    category: "Engine & Transmission",
    shortDescription: "Ultrasonic fuel injector bench cleaning, throttle calibration, valve clearance adjustment, and transmission fluid change.",
    fullDescription: "Restore lost engine power, smooth out transmission shifts, and maximize fuel efficiency. Our master technicians use ultrasonic bath cleaners to restore fuel injector spray patterns, clean carbon-choked intake valves, replace worn spark plugs, and flush transmission fluid to prevent costly gearbox slippage.",
    startingPrice: 5500,
    estimatedTime: "2 - 3 Hours",
    warranty: "30-Day Performance Guarantee",
    rating: 4.92,
    reviewsCount: 185,
    image: "/images/workshop/gallery-3.jpg",
    galleryImages: [
      "/images/workshop/gallery-3.jpg",
      "/images/workshop/gallery-5.jpg",
      "/images/workshop/gallery-2.jpg",
    ],
    keySpecs: "Ultrasonic Injector Cleaning · Spray Pattern Flow Bench · CVT / ATF Service",
    features: [
      "Ultrasonic bath fuel injector cleaning and flow bench balancing",
      "Electronic throttle body decarbonization and electronic idle relearn",
      "Iridium / Platinum spark plugs gap inspection and replacement",
      "Automatic / CVT transmission fluid pan drain, magnetic cleanup, and fresh fluid fill",
      "PCV valve, vacuum lines, and intake manifold gasket inspection",
    ],
    symptoms: [
      "Rough vibrating engine idle at stoplights",
      "Hesitation or flat spot when pressing the gas pedal",
      "Jerking or delayed gear shifting when accelerating",
      "Drop in kilometers per liter (poor fuel economy)",
      "Hard engine starting after standing overnight",
    ],
    processSteps: [
      {
        step: 1,
        title: "Injector Flow & Leak Benchmark",
        description: "Testing injector delivery cc/min before cleaning on our glass flow tube bench.",
      },
      {
        step: 2,
        title: "Heated Ultrasonic Transducer Bath",
        description: "Dissolving hardened fuel varnish and microscopic carbon deposits from injector pintles.",
      },
      {
        step: 3,
        title: "Throttle Body & Intake Air Service",
        description: "Cleaning the throttle bore and butterfly valve with specialized zero-residue cleaners.",
      },
      {
        step: 4,
        title: "Transmission Fluid Change & Calibration",
        description: "Checking ATF / CVT fluid temperature with diagnostic tool and setting exact level.",
      },
    ],
    packages: [
      {
        name: "Standard Fuel System & Injector Tune-Up",
        price: 5500,
        description: "Ultrasonic cleaning for 4 fuel injectors and throttle body service.",
        features: [
          "Ultrasonic bath injector cleaning",
          "Flow rate & spray pattern test",
          "Throttle body cleaning & idle relearn",
          "Spark plug inspection",
        ],
      },
      {
        name: "Complete Engine Tune & CVT / ATF Transmission Service",
        price: 18500,
        description: "Includes transmission fluid replacement, filter, and complete fuel tune-up.",
        popular: true,
        features: [
          "All Injector Tune-Up services",
          "Original Japanese CVT / ATF Transmission Fluid",
          "Transmission drain pan cleaning",
          "Engine computer relearn adaptation",
          "30-Day Performance Guarantee",
        ],
      },
    ],
    faqs: [
      {
        question: "When should I change my car's CVT or Automatic Transmission fluid?",
        answer: "We advise changing CVT fluid every 35,000 to 40,000 km in local driving conditions to prevent gearbox belt wear and shudder.",
      },
    ],
  },
];

export const WORKSHOP_CATEGORIES = [
  "All",
  "Starter & Alternator",
  "Electrical & Diagnostics",
  "Routine Maintenance",
  "Brakes & Suspension",
  "AC & Climate Control",
  "Engine & Transmission",
] as const;

export type WorkshopCategory = typeof WORKSHOP_CATEGORIES[number];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return WORKSHOP_SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): ServiceItem[] {
  if (!category || category === "All") return WORKSHOP_SERVICES;
  return WORKSHOP_SERVICES.filter((s) => s.category === category);
}

export function searchServices(query: string, category?: string): ServiceItem[] {
  let list = WORKSHOP_SERVICES;
  if (category && category !== "All") {
    list = list.filter((s) => s.category === category);
  }
  if (!query || query.trim() === "") return list;

  const q = query.toLowerCase().trim();
  return list.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.symptoms.some((sym) => sym.toLowerCase().includes(q)) ||
      s.features.some((f) => f.toLowerCase().includes(q))
  );
}
