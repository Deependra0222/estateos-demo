/* ==========================================================================
   EstateOS demo data — ENTIRELY FICTIONAL. Nothing here is real, nothing
   is saved, nothing talks to a server. This file exists so the client can
   see the shape of the product before the backend is built.
   ========================================================================== */

window.DEMO = (function () {

  const org = {
    name: "Shree Estates",
    tagline: "Mumbai · Thane · Pune",
    phone: "+91 98200 11223",
    email: "hello@shreeestates.in",
    currency: "INR",
    brokerage: 2.0,
    joinKeyExample: "SHREE-8KQ2-DLM9"
  };

  const levels = [
    { id: "L1", name: "Trainee",      rank: 1, commission: 20, override: 0,  perms: "Create (needs approval) · AI: own data" },
    { id: "L2", name: "Agent",        rank: 2, commission: 30, override: 0,  perms: "Create (needs approval) · AI: own data" },
    { id: "L3", name: "Senior Agent", rank: 3, commission: 40, override: 0,  perms: "Create · Export own · AI: own data" },
    { id: "L4", name: "Team Lead",    rank: 4, commission: 45, override: 5,  perms: "+ See downline · Approve team uploads" },
    { id: "L5", name: "Partner",      rank: 5, commission: 55, override: 10, perms: "+ See downline · Export all" }
  ];

  const people = [
    { id: "u1", name: "Rajesh Mehta",  role: "owner",  level: null, reportsTo: null, code: "OWN", phone: "+91 98200 11223", email: "rajesh@shreeestates.in", region: "All",     joined: "2023-04-02", status: "active",  color: "#0B5D51" },
    { id: "u2", name: "Anita Deshmukh",role: "admin",  level: null, reportsTo: "u1", code: "ADM", phone: "+91 98200 44112", email: "anita@shreeestates.in",  region: "All",     joined: "2023-06-18", status: "active",  color: "#7A4E9E" },
    { id: "u3", name: "Vikram Shah",   role: "member", level: "L4", reportsTo: "u1", code: "AG01",phone: "+91 98201 77345", email: "vikram@shreeestates.in", region: "Mumbai West", joined: "2023-08-01", status: "active", color: "#2a78d6" },
    { id: "u4", name: "Priya Nair",    role: "member", level: "L4", reportsTo: "u1", code: "AG02",phone: "+91 98202 55901", email: "priya@shreeestates.in",  region: "Thane",   joined: "2024-01-15", status: "active",  color: "#eb6834" },
    { id: "u5", name: "Ravi Sharma",   role: "member", level: "L3", reportsTo: "u3", code: "AG07",phone: "+91 98203 12876", email: "ravi@shreeestates.in",   region: "Mumbai West", joined: "2024-03-11", status: "active", color: "#1baf7a" },
    { id: "u6", name: "Sana Qureshi",  role: "member", level: "L2", reportsTo: "u3", code: "AG09",phone: "+91 98204 66120", email: "sana@shreeestates.in",   region: "Mumbai West", joined: "2024-09-02", status: "active", color: "#C9973F" },
    { id: "u7", name: "Karan Patil",   role: "member", level: "L3", reportsTo: "u4", code: "AG11",phone: "+91 98205 33447", email: "karan@shreeestates.in",  region: "Thane",   joined: "2025-02-20", status: "active",  color: "#4a3aa7" },
    { id: "u8", name: "Neha Joshi",    role: "member", level: "L2", reportsTo: "u4", code: "AG14",phone: "+91 98206 90011", email: "neha@shreeestates.in",   region: "Pune",    joined: "2025-07-08", status: "active",  color: "#d55181" }
  ];

  const pendingRequests = [
    { id: "r1", name: "Amit Kulkarni", email: "amit.k@gmail.com", phone: "+91 99870 22118", key: "SHREE-8KQ2-DLM9", requestedAt: "2026-09-28T10:14:00", note: "Referred by Vikram. 3 yrs in Andheri residential resale." },
    { id: "r2", name: "Farhan Sheikh", email: "farhan.re@gmail.com", phone: "+91 99871 40023", key: "SHREE-TH4N-6PLQ", requestedAt: "2026-09-30T17:42:00", note: "Thane branch — commercial leasing background." }
  ];

  const joinKeys = [
    { code: "SHREE-8KQ2-DLM9", label: "Mumbai West — open",   role: "Team Member", level: "L2", uses: "4 / 10", expires: "31 Dec 2026", approval: true,  active: true },
    { code: "SHREE-TH4N-6PLQ", label: "Thane branch",         role: "Team Member", level: "L2", uses: "2 / 5",  expires: "31 Oct 2026", approval: true,  active: true },
    { code: "SHREE-ADM-X92K",  label: "Co-admin (Anita)",     role: "Admin",       level: "—",  uses: "1 / 1",  expires: "—",           approval: true,  active: true },
    { code: "SHREE-PUNE-2024", label: "Pune pilot (expired)", role: "Team Member", level: "L1", uses: "3 / 3",  expires: "31 Mar 2026", approval: false, active: false }
  ];

  const areaUnits = [
    { code: "sqft",  label: "Sq Ft",        f: 1 },
    { code: "sqm",   label: "Sq Metre",     f: 10.7639 },
    { code: "sqyd",  label: "Sq Yard (Gaj)",f: 9 },
    { code: "acre",  label: "Acre",         f: 43560 },
    { code: "guntha",label: "Guntha",       f: 1089 },
    { code: "bigha", label: "Bigha",        f: 27000 },
    { code: "hectare",label:"Hectare",      f: 107639 }
  ];

  const types = [
    { key: "residential",  label: "Residential" },
    { key: "commercial",   label: "Commercial" },
    { key: "agricultural", label: "Agricultural" },
    { key: "industrial",   label: "Industrial" },
    { key: "educational",  label: "Institutional / Educational" },
    { key: "plot",         label: "Plot / Land" }
  ];

  const U = "https://images.unsplash.com/";
  const q = "?auto=format&fit=crop&w=1000&q=70";

  const properties = [
    {
      id: "PRP-1042", title: "Sea-Facing 3 BHK at Carter Road",
      type: "residential", listing: "sale", status: "available", featured: true,
      locality: "Bandra West", city: "Mumbai", region: "Mumbai West",
      area: 1450, unit: "sqft", price: 42500000, perUnit: 29310, priceUnit: "sqft",
      beds: 3, baths: 3, parking: 2, floor: "12 of 22", furnishing: "Semi-furnished",
      facing: "West", age: 6, possession: "Ready to move",
      amenities: ["Sea view", "Gym", "Clubhouse", "Power backup", "Covered parking", "24x7 security"],
      desc: "A rare west-facing 3 BHK on Carter Road with uninterrupted sea views from the living room and master bedroom. Vitrified flooring throughout, modular kitchen, two covered car parks. The building has a gym, clubhouse and full power backup. Walking distance to Carter Road promenade.",
      postedBy: "u5", postedOn: "2026-03-12", views: 1284, enquiries: 34,
      photos: [U+"photo-1522708323590-d24dbb6b0267"+q, U+"photo-1560448204-e02f11c3d0e2"+q, U+"photo-1600607687939-ce8a6c25118c"+q]
    },
    {
      id: "PRP-1043", title: "Grade-A Office Floor, BKC",
      type: "commercial", listing: "sale", status: "available", featured: true,
      locality: "Bandra Kurla Complex", city: "Mumbai", region: "Mumbai West",
      area: 4200, unit: "sqft", price: 189000000, perUnit: 45000, priceUnit: "sqft",
      beds: 0, baths: 4, parking: 8, floor: "9 of 14", furnishing: "Bare shell",
      facing: "North-East", age: 3, possession: "Ready to move",
      amenities: ["Central AC", "2 lifts + service lift", "100% DG backup", "Fire compliant", "Visitor parking"],
      desc: "Full floor plate of 4,200 sq ft in a Grade-A BKC tower. Bare shell with efficient 82% carpet ratio, eight dedicated parking bays, central air conditioning and full DG backup. Suited to a BFSI or consulting occupier.",
      postedBy: "u1", postedOn: "2026-02-02", views: 742, enquiries: 19,
      photos: [U+"photo-1486406146926-c627a92ad1ab"+q, U+"photo-1497366754035-f200968a6e72"+q]
    },
    {
      id: "PRP-1051", title: "2.5 Acre Agricultural Land, Karjat",
      type: "agricultural", listing: "sale", status: "available", featured: false,
      locality: "Karjat", city: "Raigad", region: "Pune",
      area: 2.5, unit: "acre", price: 18500000, perUnit: 7400000, priceUnit: "acre",
      beds: 0, baths: 0, parking: 0, floor: "—", furnishing: "—",
      facing: "—", age: 0, possession: "Immediate",
      amenities: ["Well water", "Road touch", "Clear 7/12", "Fenced", "Electricity at plot"],
      desc: "Road-touch agricultural land with a functioning well and electricity connection at the plot boundary. Clear 7/12 extract, non-tribal, fenced on three sides. Popular belt for weekend farmhouses, 20 minutes from Karjat station.",
      extra: { "Water source": "Open well + borewell", "Soil": "Red loam", "Current crop": "Rice (single)" },
      postedBy: "u7", postedOn: "2026-05-22", views: 498, enquiries: 21,
      photos: [U+"photo-1500382017468-9049fed747ef"+q, U+"photo-1464226184884-fa280b87c399"+q]
    },
    {
      id: "PRP-1055", title: "Residential Plot 250 Gaj, Wagholi",
      type: "plot", listing: "sale", status: "available", featured: false,
      locality: "Wagholi", city: "Pune", region: "Pune",
      area: 250, unit: "sqyd", price: 6250000, perUnit: 25000, priceUnit: "sqyd",
      beds: 0, baths: 0, parking: 0, floor: "—", furnishing: "—",
      facing: "East", age: 0, possession: "Immediate",
      amenities: ["Gated layout", "NA sanctioned", "30 ft road", "Water line", "Street lighting"],
      desc: "East-facing NA-sanctioned plot in a gated layout at Wagholi. 30 ft internal road, underground water line and street lighting already laid. Clear title, ready for construction.",
      postedBy: "u8", postedOn: "2026-06-30", views: 356, enquiries: 12,
      photos: [U+"photo-1523575166262-1c1c9b1b9b9b"+q, U+"photo-1512917774080-9991f1c4c750"+q]
    },
    {
      id: "PRP-1060", title: "2 BHK for Rent, Andheri East",
      type: "residential", listing: "rent", status: "available", featured: false,
      locality: "Andheri East", city: "Mumbai", region: "Mumbai West",
      area: 980, unit: "sqft", price: 72000, perUnit: 73, priceUnit: "sqft",
      beds: 2, baths: 2, parking: 1, floor: "7 of 15", furnishing: "Fully furnished",
      facing: "East", age: 9, possession: "From 15 Oct",
      amenities: ["Fully furnished", "Lift", "Gym", "Metro 400 m", "Pet friendly"],
      desc: "Fully furnished 2 BHK five minutes from Andheri metro. Comes with all white goods, wardrobes and an air-conditioned living room. Society permits pets. Deposit three months.",
      postedBy: "u6", postedOn: "2026-08-14", views: 903, enquiries: 41,
      photos: [U+"photo-1502672260266-1c1ef2d93688"+q, U+"photo-1493809842364-78817add7ffb"+q]
    },
    {
      id: "PRP-1063", title: "12,000 Sq Ft Warehouse, Bhiwandi",
      type: "industrial", listing: "lease", status: "available", featured: false,
      locality: "Bhiwandi", city: "Thane", region: "Thane",
      area: 12000, unit: "sqft", price: 660000, perUnit: 55, priceUnit: "sqft",
      beds: 0, baths: 2, parking: 6, floor: "Ground", furnishing: "Bare shell",
      facing: "—", age: 4, possession: "Immediate",
      amenities: ["9 m clear height", "Dock levellers", "40 ft driveway", "Fire NOC", "24x7 access"],
      desc: "PEB warehouse with 9 m clear height, two dock levellers and a 40 ft internal driveway for trailer movement. Fire NOC in place. Suitable for 3PL and e-commerce fulfilment.",
      extra: { "Clear height": "9 m", "Floor load": "5 T/sqm", "Docks": "2" },
      postedBy: "u4", postedOn: "2026-04-18", views: 611, enquiries: 17,
      photos: [U+"photo-1553413077-190dd305871c"+q, U+"photo-1580674285054-bed31e145f59"+q]
    },
    {
      id: "PRP-1066", title: "8 Guntha Farm Plot, Igatpuri Road",
      type: "agricultural", listing: "sale", status: "reserved", featured: false,
      locality: "Igatpuri", city: "Nashik", region: "Pune",
      area: 8, unit: "guntha", price: 4800000, perUnit: 600000, priceUnit: "guntha",
      beds: 0, baths: 0, parking: 0, floor: "—", furnishing: "—",
      facing: "—", age: 0, possession: "Immediate",
      amenities: ["Hill view", "Borewell", "Approach road", "Compound wall"],
      desc: "Eight guntha farm plot with a hill-facing aspect, borewell and a completed compound wall. Approach road from the highway is tarred. Ideal weekend farmhouse plot.",
      postedBy: "u7", postedOn: "2026-07-05", views: 287, enquiries: 9,
      photos: [U+"photo-1500382017468-9049fed747ef"+q]
    },
    {
      id: "PRP-1070", title: "School Building on 22,000 Sq Ft, Thane",
      type: "educational", listing: "sale", status: "available", featured: true,
      locality: "Ghodbunder Road", city: "Thane", region: "Thane",
      area: 22000, unit: "sqft", price: 340000000, perUnit: 15455, priceUnit: "sqft",
      beds: 0, baths: 14, parking: 20, floor: "G + 3", furnishing: "Fitted",
      facing: "North", age: 11, possession: "On agreement",
      amenities: ["24 classrooms", "Assembly hall", "Playground", "Lab block", "Bus bay", "Lift"],
      desc: "Operating school premises on Ghodbunder Road: 24 classrooms across G+3, an assembly hall, science and computer labs, a playground and a dedicated bus bay. Suitable for an education group seeking an established campus.",
      extra: { "Classrooms": "24", "Sanctioned capacity": "1,100 students", "Land": "0.51 acre" },
      postedBy: "u1", postedOn: "2026-01-20", views: 431, enquiries: 8,
      photos: [U+"photo-1580582932707-520aed937b7b"+q, U+"photo-1523050854058-8df90110c9f1"+q]
    },
    {
      id: "PRP-1074", title: "4 BHK Duplex Penthouse, Worli Sea Face",
      type: "residential", listing: "sale", status: "available", featured: true,
      locality: "Worli", city: "Mumbai", region: "Mumbai West",
      area: 3200, unit: "sqft", price: 210000000, perUnit: 65625, priceUnit: "sqft",
      beds: 4, baths: 5, parking: 4, floor: "38–39 of 40", furnishing: "Fully furnished",
      facing: "West", age: 2, possession: "Ready to move",
      amenities: ["Private terrace", "Infinity pool", "Concierge", "Home automation", "4 car parks", "Sea view"],
      desc: "Duplex penthouse across the 38th and 39th floors with a 900 sq ft private terrace facing the sea. Italian marble, full home automation, four dedicated parking bays and building concierge. One of eight units on the tier.",
      postedBy: "u3", postedOn: "2026-02-28", views: 2140, enquiries: 27,
      photos: [U+"photo-1613490493576-7fde63acd811"+q, U+"photo-1600566753086-00f18fb6b3ea"+q, U+"photo-1600585154340-be6161a56a0c"+q]
    },
    {
      id: "PRP-1078", title: "Ground-Floor Retail Shop, Dadar West",
      type: "commercial", listing: "sale", status: "under_offer", featured: false,
      locality: "Dadar West", city: "Mumbai", region: "Mumbai West",
      area: 650, unit: "sqft", price: 39000000, perUnit: 60000, priceUnit: "sqft",
      beds: 0, baths: 1, parking: 0, floor: "Ground", furnishing: "Bare shell",
      facing: "Road", age: 18, possession: "On agreement",
      amenities: ["Main road frontage", "22 ft frontage", "Shutter", "Water connection"],
      desc: "Ground-floor shop with 22 ft of main-road frontage on a high-footfall stretch in Dadar West. Currently vacant, shutter and water connection in place.",
      extra: { "Frontage": "22 ft", "Footfall stretch": "High" },
      postedBy: "u5", postedOn: "2026-05-09", views: 866, enquiries: 23,
      photos: [U+"photo-1441986300917-64674bd600d8"+q]
    },
    {
      id: "PRP-1081", title: "Compact 1 BHK, Malad West",
      type: "residential", listing: "sale", status: "available", featured: false,
      locality: "Malad West", city: "Mumbai", region: "Mumbai West",
      area: 610, unit: "sqft", price: 11500000, perUnit: 18852, priceUnit: "sqft",
      beds: 1, baths: 1, parking: 1, floor: "4 of 8", furnishing: "Unfurnished",
      facing: "North", age: 12, possession: "Ready to move",
      amenities: ["Lift", "Covered parking", "Water 24x7", "Near station"],
      desc: "Well-maintained 1 BHK in a registered society, ten minutes from Malad station. Covered parking, round-the-clock water, lift. Good first-home or rental-yield buy.",
      postedBy: "u6", postedOn: "2026-08-25", views: 512, enquiries: 15,
      photos: [U+"photo-1493809842364-78817add7ffb"+q]
    },
    {
      id: "PRP-1085", title: "5-BHK Villa with Lawn, Lonavala",
      type: "residential", listing: "sale", status: "available", featured: false,
      locality: "Tungarli", city: "Lonavala", region: "Pune",
      area: 5200, unit: "sqft", price: 75000000, perUnit: 14423, priceUnit: "sqft",
      beds: 5, baths: 6, parking: 4, floor: "G + 1", furnishing: "Fully furnished",
      facing: "South-East", age: 5, possession: "Ready to move",
      amenities: ["Private pool", "Lawn", "Valley view", "Staff quarters", "Solar water", "Gated community"],
      desc: "Furnished five-bedroom villa on a 5,200 sq ft plot in a gated Tungarli community, with a private pool, lawn and valley views. Staff quarters and solar water heating included.",
      postedBy: "u8", postedOn: "2026-09-02", views: 977, enquiries: 26,
      photos: [U+"photo-1600596542815-ffad4c1539a9"+q, U+"photo-1580587771525-78b9dba3b914"+q]
    }
  ];

  const stages = [
    { key: "new",             label: "New Lead",       color: "#8A9793" },
    { key: "contacted",       label: "Contacted",      color: "#2a78d6" },
    { key: "qualified",       label: "Qualified",      color: "#4a3aa7" },
    { key: "property_shared", label: "Property Shared",color: "#C9973F" },
    { key: "site_visit",      label: "Site Visit",     color: "#eb6834" },
    { key: "negotiation",     label: "Negotiation",    color: "#B07A06" },
    { key: "closed_won",      label: "Closed — Won",   color: "#1A7F5A" },
    { key: "closed_lost",     label: "Closed — Lost",  color: "#C2333A" }
  ];

  const leads = [
    { id:"LD-2041", name:"Rahul Sharma",   phone:"+91 98200 11223", stage:"site_visit",      budget:"₹3.2 – 3.8 Cr", config:"3 BHK", locality:"Bandra West",  region:"Mumbai West", type:"residential", source:"WhatsApp", owner:"u5", priority:"hot",  score:88, next:"2026-10-02T17:00", updated:"2026-09-30T11:20", props:["PRP-1042"] },
    { id:"LD-2044", name:"Meera Iyer",     phone:"+91 98211 40912", stage:"negotiation",     budget:"₹18 – 21 Cr",   config:"Office", locality:"BKC",         region:"Mumbai West", type:"commercial",  source:"Referral", owner:"u3", priority:"hot",  score:92, next:"2026-10-01T15:30", updated:"2026-09-29T18:05", props:["PRP-1043"] },
    { id:"LD-2047", name:"Sunil Gaikwad",  phone:"+91 98222 71165", stage:"qualified",       budget:"₹1.5 – 2 Cr",   config:"Land",  locality:"Karjat",       region:"Pune",        type:"agricultural",source:"Website",  owner:"u7", priority:"warm", score:64, next:"2026-10-03T11:00", updated:"2026-09-28T09:40", props:["PRP-1051"] },
    { id:"LD-2049", name:"Fatima Ansari",  phone:"+91 98233 55018", stage:"property_shared", budget:"₹60 – 70 L",    config:"Plot",  locality:"Wagholi",      region:"Pune",        type:"plot",        source:"Portal",   owner:"u8", priority:"warm", score:58, next:"2026-10-04T13:00", updated:"2026-09-27T16:12", props:["PRP-1055"] },
    { id:"LD-2052", name:"Deepak Rane",    phone:"+91 98244 90233", stage:"contacted",       budget:"₹70 – 80 K/mo", config:"2 BHK", locality:"Andheri East", region:"Mumbai West", type:"residential", source:"Website",  owner:"u6", priority:"warm", score:55, next:"2026-10-02T10:00", updated:"2026-09-30T08:55", props:["PRP-1060"] },
    { id:"LD-2055", name:"Anjali Bhatt",   phone:"+91 98255 12388", stage:"new",             budget:"₹1 – 1.3 Cr",   config:"1 BHK", locality:"Malad West",   region:"Mumbai West", type:"residential", source:"Website",  owner:"u6", priority:"cold", score:38, next:"2026-10-01T12:00", updated:"2026-10-01T07:30", props:[] },
    { id:"LD-2058", name:"Rohit Malhotra", phone:"+91 98266 43390", stage:"site_visit",      budget:"₹7 – 9 Cr",     config:"Villa", locality:"Lonavala",     region:"Pune",        type:"residential", source:"Referral", owner:"u8", priority:"hot",  score:81, next:"2026-10-05T09:30", updated:"2026-09-29T14:44", props:["PRP-1085"] },
    { id:"LD-2061", name:"Kavita Menon",   phone:"+91 98277 66504", stage:"closed_won",      budget:"₹2 Cr",         config:"2 BHK", locality:"Powai",        region:"Mumbai West", type:"residential", source:"Walk-in",  owner:"u5", priority:"hot",  score:100,next:null,                updated:"2026-09-18T17:00", props:[] },
    { id:"LD-2063", name:"Imran Qadri",    phone:"+91 98288 31177", stage:"negotiation",     budget:"₹6 – 7 L/mo",   config:"Warehouse", locality:"Bhiwandi", region:"Thane",       type:"industrial",  source:"WhatsApp", owner:"u4", priority:"hot",  score:86, next:"2026-10-02T16:00", updated:"2026-09-30T13:10", props:["PRP-1063"] },
    { id:"LD-2066", name:"Sneha Kulkarni", phone:"+91 98299 80025", stage:"contacted",       budget:"₹35 – 40 L",    config:"Farm plot", locality:"Igatpuri", region:"Pune",        type:"agricultural",source:"Website",  owner:"u7", priority:"cold", score:41, next:"2026-10-06T11:30", updated:"2026-09-26T10:05", props:["PRP-1066"] },
    { id:"LD-2069", name:"George Mathew",  phone:"+91 98301 22456", stage:"qualified",       budget:"₹3.5 – 4.2 Cr", config:"Shop",  locality:"Dadar West",   region:"Mumbai West", type:"commercial",  source:"Referral", owner:"u3", priority:"warm", score:72, next:"2026-10-03T15:00", updated:"2026-09-28T12:30", props:["PRP-1078"] },
    { id:"LD-2072", name:"Pooja Agarwal",  phone:"+91 98312 77890", stage:"property_shared", budget:"₹20 – 24 Cr",   config:"4 BHK", locality:"Worli",        region:"Mumbai West", type:"residential", source:"Referral", owner:"u3", priority:"hot",  score:79, next:"2026-10-02T19:00", updated:"2026-09-30T20:15", props:["PRP-1074"] },
    { id:"LD-2075", name:"Nikhil Verma",   phone:"+91 98323 10044", stage:"closed_lost",     budget:"₹90 L – 1.1 Cr",config:"1 BHK", locality:"Malad West",   region:"Mumbai West", type:"residential", source:"Portal",   owner:"u6", priority:"cold", score:22, next:null,                updated:"2026-09-12T15:20", props:["PRP-1081"], lost:"Bought directly from builder" },
    { id:"LD-2078", name:"Trustee — Vidya Trust", phone:"+91 98334 55621", stage:"new",      budget:"₹30 – 36 Cr",   config:"Campus",locality:"Ghodbunder",   region:"Thane",       type:"educational", source:"Website",  owner:"u4", priority:"warm", score:61, next:"2026-10-02T11:00", updated:"2026-10-01T06:10", props:["PRP-1070"] },
    { id:"LD-2081", name:"Arjun Reddy",    phone:"+91 98345 09988", stage:"site_visit",      budget:"₹4 – 4.5 Cr",   config:"3 BHK", locality:"Bandra West",  region:"Mumbai West", type:"residential", source:"WhatsApp", owner:"u5", priority:"warm", score:69, next:"2026-10-04T18:00", updated:"2026-09-30T09:25", props:["PRP-1042"] },
    { id:"LD-2084", name:"Lata Shinde",    phone:"+91 98356 43012", stage:"contacted",       budget:"₹55 – 65 L",    config:"Plot",  locality:"Wagholi",      region:"Pune",        type:"plot",        source:"Walk-in",  owner:"u8", priority:"warm", score:52, next:"2026-10-03T10:30", updated:"2026-09-29T11:50", props:["PRP-1055"] }
  ];

  /* ---- Deals & commissions ------------------------------------------- */
  const deals = [
    {
      id: "DL-318", lead: "LD-2061", leadName: "Kavita Menon", property: "2 BHK, Powai (off-market)",
      value: 20000000, brokeragePct: 2.0, brokerage: 400000,
      stage: "registered", closedOn: "2026-09-18", closedBy: "u5", region: "Mumbai West",
      splits: [
        { who: "Ravi Sharma",  id: "u5", role: "Sourcing + Closing", pct: 50, amt: 200000, status: "paid" },
        { who: "Broker B — XYZ Realty", id: null, role: "External co-broker", pct: 50, amt: 200000, status: "received" }
      ]
    },
    {
      id: "DL-315", lead: "LD-2044", leadName: "Meera Iyer", property: "PRP-1043 · Office Floor, BKC",
      value: 185000000, brokeragePct: 1.5, brokerage: 2775000,
      stage: "agreement", closedOn: "2026-09-25", closedBy: "u3", region: "Mumbai West",
      splits: [
        { who: "Vikram Shah", id: "u3", role: "Closing",          pct: 45, amt: 1248750, status: "approved" },
        { who: "Ravi Sharma", id: "u5", role: "Sourcing",         pct: 20, amt: 555000,  status: "approved" },
        { who: "Rajesh Mehta",id: "u1", role: "Manager override", pct: 5,  amt: 138750,  status: "expected" },
        { who: "House",       id: null, role: "Company share",    pct: 30, amt: 832500,  status: "expected" }
      ]
    },
    {
      id: "DL-312", lead: "LD-2058", leadName: "Rohit Malhotra", property: "PRP-1085 · Villa, Lonavala",
      value: 74000000, brokeragePct: 2.0, brokerage: 1480000,
      stage: "token", closedOn: "2026-09-29", closedBy: "u8", region: "Pune",
      splits: [
        { who: "Neha Joshi",  id: "u8", role: "Sourcing + Closing", pct: 30, amt: 444000, status: "expected" },
        { who: "Priya Nair",  id: "u4", role: "Manager override",   pct: 5,  amt: 74000,  status: "expected" },
        { who: "House",       id: null, role: "Company share",      pct: 65, amt: 962000, status: "expected" }
      ]
    },
    {
      id: "DL-309", lead: "LD-2069", leadName: "George Mathew", property: "PRP-1078 · Shop, Dadar West",
      value: 38500000, brokeragePct: 2.0, brokerage: 770000,
      stage: "agreement", closedOn: "2026-09-11", closedBy: "u3", region: "Mumbai West",
      splits: [
        { who: "Vikram Shah", id: "u3", role: "Sourcing + Closing", pct: 45, amt: 346500, status: "received" },
        { who: "House",       id: null, role: "Company share",      pct: 55, amt: 423500, status: "received" }
      ]
    },
    {
      id: "DL-305", lead: "LD-2063", leadName: "Imran Qadri", property: "PRP-1063 · Warehouse lease, Bhiwandi",
      value: 7920000, brokerageType: "flat", brokerageNote: "One month's rent", brokeragePct: 8.333, brokerage: 660000,
      stage: "registered", closedOn: "2026-08-28", closedBy: "u4", region: "Thane",
      splits: [
        { who: "Priya Nair",  id: "u4", role: "Sourcing + Closing", pct: 45, amt: 297000, status: "paid" },
        { who: "Karan Patil", id: "u7", role: "Support",            pct: 10, amt: 66000,  status: "paid" },
        { who: "House",       id: null, role: "Company share",      pct: 45, amt: 297000, status: "paid" }
      ]
    },
    {
      id: "DL-301", lead: "—", leadName: "Suresh Pawar", property: "1 BHK, Malad West (resale)",
      value: 11200000, brokeragePct: 2.0, brokerage: 224000,
      stage: "registered", closedOn: "2026-08-06", closedBy: "u6", region: "Mumbai West",
      splits: [
        { who: "Sana Qureshi", id: "u6", role: "Sourcing + Closing", pct: 30, amt: 67200,  status: "paid" },
        { who: "Vikram Shah",  id: "u3", role: "Manager override",   pct: 5,  amt: 11200,  status: "paid" },
        { who: "House",        id: null, role: "Company share",      pct: 65, amt: 145600, status: "paid" }
      ]
    }
  ];

  const commissionRules = [
    { name: "Team Lead — all",              level: "L4", scope: "Any type · Any region",       sourcing: 20, closing: 25, override: 5,  house: 50 },
    { name: "Senior Agent — Residential",   level: "L3", scope: "Residential · Mumbai West",   sourcing: 18, closing: 22, override: 5,  house: 55 },
    { name: "Senior Agent — Commercial",    level: "L3", scope: "Commercial · Any region",     sourcing: 20, closing: 25, override: 5,  house: 50 },
    { name: "Agent — standard",             level: "L2", scope: "Any type · Any region",       sourcing: 12, closing: 18, override: 5,  house: 65 },
    { name: "High-value slab (> ₹10 Cr)",   level: "L4", scope: "Deal value ≥ ₹10 Cr",         sourcing: 25, closing: 30, override: 5,  house: 40 }
  ];

  /* ---- WhatsApp ------------------------------------------------------ */
  const conversations = [
    {
      id: "c1", name: "Rahul Sharma", phone: "+91 98200 11223", lead: "LD-2041",
      assigned: "u5", unread: 2, last: "10:42", window: "open", tag: "Customer",
      messages: [
        { dir: "in",  t: "09:14", body: "Hi, I saw the Carter Road 3BHK on your site. Is it still available?" },
        { dir: "out", t: "09:18", body: "Good morning Rahul! Yes, PRP-1042 is available. 1,450 sq ft, west facing, ₹4.25 Cr. Sharing the details now.", by: "Ravi Sharma" },
        { dir: "out", t: "09:18", body: "🏠 Sea-Facing 3 BHK at Carter Road — shreeestates.in/s/k3f9dq", by: "Ravi Sharma", kind: "share" },
        { dir: "in",  t: "09:40", body: "Looks good. Can we see it this Saturday morning?" },
        { dir: "out", t: "09:46", body: "Absolutely. Saturday 11:00 AM works — I'll confirm with the owner and send you a reminder.", by: "Ravi Sharma" },
        { dir: "out", t: "09:47", body: "Site visit confirmed for Sat 4 Oct, 11:00 AM at Carter Road. Reply RESCHEDULE if you need another time.", by: "Automation", kind: "template", template: "sitevisit_confirm_v1" },
        { dir: "in",  t: "10:41", body: "Confirmed. Also does it have two parking slots?" },
        { dir: "in",  t: "10:42", body: "And what's the society maintenance?" }
      ]
    },
    {
      id: "c2", name: "Ravi Sharma (AG07)", phone: "+91 98203 12876", lead: null,
      assigned: "u1", unread: 0, last: "Yesterday", window: "open", tag: "Team member",
      messages: [
        { dir: "in", t: "18:22", body: "#LEAD\nName: Arjun Reddy\nPhone: 9834509988\nBudget: 4.5Cr\nLocation: Bandra West\nConfig: 3BHK\nType: Buy\nProperty: PRP-1042\nNotes: wants sea view, ready to move, can close in 30 days" },
        { dir: "out", t: "18:22", body: "✅ Lead LD-2081 created — Arjun Reddy, ₹4.5 Cr, 3 BHK, Bandra West. Assigned to you. Linked to PRP-1042.", by: "Automation", kind: "system" },
        { dir: "in", t: "18:40", body: "#VISIT LD-2081 saturday 6pm PRP-1042" },
        { dir: "out", t: "18:40", body: "📅 Site visit scheduled — LD-2081 · PRP-1042 · Sat 4 Oct, 6:00 PM. Reminder will go out 2 hours before.", by: "Automation", kind: "system" }
      ]
    },
    {
      id: "c3", name: "Meera Iyer", phone: "+91 98211 40912", lead: "LD-2044",
      assigned: "u3", unread: 1, last: "Yesterday", window: "closed", tag: "Customer",
      messages: [
        { dir: "out", t: "Mon 11:02", body: "Meera, sharing the revised term sheet for the BKC floor as discussed.", by: "Vikram Shah" },
        { dir: "in",  t: "Mon 14:30", body: "Received. Our CFO wants the fit-out allowance confirmed in writing." },
        { dir: "out", t: "Mon 15:10", body: "Understood — I'll get that from the seller and revert by Wednesday.", by: "Vikram Shah" },
        { dir: "in",  t: "Tue 19:55", body: "Any update on the fit-out allowance?" }
      ]
    },
    {
      id: "c4", name: "Sunil Gaikwad", phone: "+91 98222 71165", lead: "LD-2047",
      assigned: "u7", unread: 0, last: "28 Sep", window: "closed", tag: "Customer",
      messages: [
        { dir: "in",  t: "28 Sep 09:12", body: "Is the Karjat land 7/12 clear? Any tribal restriction?" },
        { dir: "out", t: "28 Sep 09:40", body: "Clear 7/12, non-tribal, fenced on three sides. I can share the extract on WhatsApp.", by: "Karan Patil" },
        { dir: "out", t: "28 Sep 09:41", body: "📄 7-12-extract-karjat.pdf", by: "Karan Patil", kind: "doc" }
      ]
    },
    {
      id: "c5", name: "Anjali Bhatt", phone: "+91 98255 12388", lead: "LD-2055",
      assigned: "u6", unread: 0, last: "Today", window: "open", tag: "Website enquiry",
      messages: [
        { dir: "in",  t: "07:28", body: "Enquiry from website: interested in 1 BHK Malad West", kind: "system" },
        { dir: "out", t: "07:28", body: "Hi Anjali, thanks for your interest in Shree Estates! An advisor will call you within 30 minutes. Meanwhile here are 3 matching homes in Malad West.", by: "Automation", kind: "template", template: "welcome_enquiry_v1" },
        { dir: "in",  t: "07:55", body: "Thanks. Please call after 6 pm, I'm at work." }
      ]
    }
  ];

  const automationLog = [
    { t: "Today 10:42", wf: "WF-1 Inbound", detail: "Message from +91 98200 11223 → LD-2041", status: "ok" },
    { t: "Today 07:28", wf: "WF-5 Website enquiry", detail: "Enquiry → LD-2055 created, welcome_enquiry_v1 sent", status: "ok" },
    { t: "Today 06:15", wf: "WF-4 Follow-ups", detail: "7 reminders queued, 7 delivered", status: "ok" },
    { t: "Yest 18:40", wf: "WF-2 Lead parser", detail: "#VISIT from AG07 → site visit on LD-2081", status: "ok" },
    { t: "Yest 18:22", wf: "WF-2 Lead parser", detail: "#LEAD from AG07 → LD-2081 created", status: "ok" },
    { t: "Yest 12:03", wf: "WF-3 Outbound", detail: "Template to +91 98266 43390 — failed, retried, delivered", status: "partial" },
    { t: "29 Sep 20:15", wf: "WF-2 Lead parser", detail: "Unparsed message from AG09 → AI fallback, confirmation sent", status: "ok" }
  ];

  /* ---- Analytics ------------------------------------------------------ */
  const monthly = [
    { m: "Apr", leads: 46, closed: 3, brokerage:  980000 },
    { m: "May", leads: 52, closed: 4, brokerage: 1320000 },
    { m: "Jun", leads: 61, closed: 2, brokerage:  640000 },
    { m: "Jul", leads: 58, closed: 3, brokerage: 1180000 },
    { m: "Aug", leads: 67, closed: 2, brokerage:  884000 },   // = DL-305 + DL-301
    { m: "Sep", leads: 74, closed: 4, brokerage: 5425000 }    // = DL-318 + DL-315 + DL-312 + DL-309
  ];

  const funnel = [
    { stage: "New Lead",        n: 74 },
    { stage: "Contacted",       n: 61 },
    { stage: "Qualified",       n: 43 },
    { stage: "Property Shared", n: 31 },
    { stage: "Site Visit",      n: 19 },
    { stage: "Negotiation",     n: 12 },
    { stage: "Closed — Won",    n: 4  }
  ];

  const leaderboard = [
    { id: "u3", name: "Vikram Shah",   leads: 18, visits: 11, deals: 3, value: 234700000, earned: 1606450, conv: 16.7 },
    { id: "u5", name: "Ravi Sharma",   leads: 22, visits: 14, deals: 2, value: 205000000, earned: 755000,  conv: 9.1  },
    { id: "u4", name: "Priya Nair",    leads: 14, visits: 8,  deals: 2, value: 81920000,  earned: 371000,  conv: 14.3 },
    { id: "u8", name: "Neha Joshi",    leads: 11, visits: 6,  deals: 1, value: 74000000,  earned: 444000,  conv: 9.1  },
    { id: "u7", name: "Karan Patil",   leads: 9,  visits: 5,  deals: 1, value: 7920000,   earned: 66000,   conv: 11.1 },
    { id: "u6", name: "Sana Qureshi",  leads: 13, visits: 4,  deals: 1, value: 11200000,  earned: 67200,   conv: 7.7  }
  ];

  const regionPerf = [
    { region: "Mumbai West", leads: 44, deals: 4, value: 254700000, brokerage: 4169000 },
    { region: "Thane",       leads: 17, deals: 1, value: 7920000,   brokerage: 660000  },
    { region: "Pune",        leads: 13, deals: 1, value: 74000000,  brokerage: 1480000 }
  ];

  /* ---- AI canned answers --------------------------------------------- */
  const aiSuggested = [
    "How did we do last month?",
    "Who are my top 3 performers this quarter?",
    "Which region has the slowest follow-ups?",
    "How much commission is still outstanding?",
    "Why did conversion drop in June?",
    "Which properties have been unsold over 90 days?"
  ];

  const aiAnswers = {
    "how did we do last month?": {
      scope: "org",
      text: "September was comfortably your best month of the financial year. You took in **74 new leads** and closed **4 deals** worth **₹31.75 Cr** in transaction value, generating **₹54.25 L** in brokerage against August's ₹8.84 L.\n\nRead that lift carefully. One deal — the BKC office floor (DL-315, ₹18.5 Cr) — accounts for **₹27.75 L**, just over half the month, and it is still only at agreement stage, so none of it has been received. Strip it out and September was ₹26.5 L: still a good month, but a very different one.\n\nConversion from new lead to closed-won was **5.4%**, a little ahead of the 6-month average of 5.0%.",
      numbers: [
        ["New leads", "74"], ["Deals closed", "4"], ["Transaction value", "₹31.75 Cr"],
        ["Brokerage", "₹54.25 L"], ["Of which unreceived", "₹27.75 L"], ["Lead → Won", "5.4%"]
      ],
      chart: "monthly",
      followups: ["Show me September's deals", "How much of that is actually received?", "Compare September to last September"]
    },
    "who are my top 3 performers this quarter?": {
      scope: "org",
      text: "By brokerage earned this quarter:\n\n1. **Vikram Shah** — ₹16.06 L across 3 deals (₹23.47 Cr transacted), and the best conversion on the team at 16.7%.\n2. **Ravi Sharma** — ₹7.55 L across 2 deals. Highest lead volume on the team (22), converting at 9.1%.\n3. **Neha Joshi** — ₹4.44 L on a single Lonavala villa, still at token stage.\n\nVikram's number is concentrated: the BKC deal alone is 78% of his quarter, and ₹12.49 L of his total is approved but not yet received. Ravi is the steadier performer on volume — the gap between his 14 site visits and 2 closes is the clearest coaching opportunity on the team.",
      numbers: [["Vikram Shah", "₹16.06 L"], ["Ravi Sharma", "₹7.55 L"], ["Neha Joshi", "₹4.44 L"]],
      chart: "leaderboard",
      followups: ["Why is Ravi's conversion low?", "Show Vikram's pipeline", "Who's below target?"]
    },
    "which region has the slowest follow-ups?": {
      scope: "org",
      text: "**Pune** is the slowest. Median time from lead creation to first contact is **31 hours** there, against 6 hours in Mumbai West and 9 hours in Thane.\n\nThe pattern is concentrated in website leads assigned to Neha Joshi and Karan Patil — 9 of the 13 Pune leads this quarter waited more than a day. Pune also has the lowest site-visit rate (23% of qualified leads, vs 44% in Mumbai West).\n\nThis looks structural rather than individual: Pune leads arrive through the website at all hours and there is no one on the round-robin outside office hours.",
      numbers: [["Pune median first contact", "31 h"], ["Mumbai West", "6 h"], ["Thane", "9 h"], ["Pune leads > 24 h", "9 of 13"]],
      chart: "region",
      followups: ["List the Pune leads that waited", "Suggest a round-robin fix", "Compare last quarter"]
    },
    "how much commission is still outstanding?": {
      scope: "org",
      text: "**₹52.25 L** of brokerage is not yet settled.\n\n- Expected, not yet approved: **₹24.51 L**\n- Approved, awaiting receipt: **₹18.04 L**\n- Received but not yet paid out to the brokers: **₹9.70 L**\n\nAgainst that, ₹10.84 L has been fully settled. The oldest open item is DL-309 (Dadar shop) at 20 days from agreement and nothing has crossed 30 days, so ageing is healthy. The concentration is what to watch: DL-315 alone carries ₹27.75 L of the total and is still only at agreement stage.",
      numbers: [["Total outstanding", "₹52.25 L"], ["Expected", "₹24.51 L"], ["Approved", "₹18.04 L"], ["Received, unpaid", "₹9.70 L"], ["Oldest item", "20 days"]],
      chart: null,
      followups: ["Show the ageing buckets", "Which deals are stuck at Expected?", "Draft a follow-up for DL-315"]
    },
    "why did conversion drop in june?": {
      scope: "org",
      text: "June took the highest lead volume of the half-year (**61**) and closed the fewest deals — **2**, for **₹6.4 L**. That is 3.3% conversion against a 6-month average of 5.0%.\n\nThree things line up:\n\n1. **Lead mix.** 38% of June's leads came from portals, up from 19% in May. Portal leads convert at 4.1% for you; referrals convert at 18%.\n2. **Response time.** Median first contact slipped to 19 hours from 7 hours in May — two agents were on leave in the same week.\n3. **Site visits.** Only 11 visits were conducted against 31 qualified leads, the worst ratio of the half-year.\n\nThe volume was real; the follow-through was not. Some of it was recoverable — three of June's qualified leads eventually closed in September, two to three months later than they should have.",
      numbers: [["June leads", "61"], ["June closes", "2"], ["Conversion", "3.3%"], ["6-mo average", "5.0%"], ["Portal share", "38%"]],
      chart: "monthly",
      followups: ["Should we keep buying portal leads?", "Show June's lost reasons", "Compare portal vs referral ROI"]
    },
    "which properties have been unsold over 90 days?": {
      scope: "org",
      text: "Five listings have been live for more than 90 days:\n\n| Property | Days | Views | Enquiries |\n|---|---|---|---|\n| PRP-1070 School, Ghodbunder | 254 | 431 | 8 |\n| PRP-1043 Office, BKC | 241 | 742 | 19 |\n| PRP-1074 Penthouse, Worli | 215 | 2,140 | 27 |\n| PRP-1042 Carter Road 3BHK | 203 | 1,284 | 34 |\n| PRP-1051 Karjat land | 132 | 498 | 21 |\n\nPRP-1070 is the real problem: 254 days with only 8 enquiries against 431 views — a 1.9% enquiry rate, the worst in the portfolio. Either the price is wrong for an institutional buyer or the listing is reaching the wrong audience. By contrast PRP-1042 converts views to enquiries at 2.6% and is simply a slow, high-ticket sale.",
      numbers: [["Listings > 90 days", "5"], ["Worst enquiry rate", "PRP-1070 · 1.9%"], ["Oldest", "254 days"]],
      chart: null,
      followups: ["Suggest a price for PRP-1070", "Which listings should we refresh?", "Show enquiry rate by type"]
    },
    "__member_default": {
      scope: "self",
      text: "Here's your September, Ravi.\n\nYou took **22 new leads**, conducted **14 site visits** and closed **2 deals** worth **₹20.5 Cr**, earning **₹7.55 L** in commission — of which ₹2 L is paid and ₹5.55 L is approved but not yet received.\n\nYour site-visit rate is the best on the team (64% of qualified leads), but only 14% of your visits convert to a close, against 31% for the team. The leads that stall are mostly in the ₹3–4 Cr band at Bandra West, where you are competing with three other agencies on the same inventory.\n\nYou have **4 follow-ups due this week** and one, LD-2081, is overdue by a day.",
      numbers: [["Your new leads", "22"], ["Site visits", "14"], ["Deals closed", "2"], ["Your commission", "₹7.55 L"], ["Paid", "₹2.00 L"]],
      chart: null,
      followups: ["Show my overdue follow-ups", "Which of my leads are most likely to close?", "How do I compare to last month?"],
      note: "Answering over: your data only"
    }
  };

  const insights = [
    { tone: "critical", title: "Follow-ups slipping in Pune", body: "9 of 13 Pune leads waited over 24 hours for first contact this quarter. Site-visit rate there is 23% against 44% in Mumbai West.", cta: "Show Pune leads" },
    { tone: "warn",     title: "PRP-1070 is stale", body: "254 days live, 431 views, 8 enquiries — a 1.9% enquiry rate, the worst in the portfolio. Price or audience is wrong.", cta: "Open listing" },
    { tone: "good",     title: "September brokerage ₹54.25 L", body: "Six times August's ₹8.84 L — but ₹27.75 L of it is one BKC deal still at agreement stage, with nothing received.", cta: "See the deals" },
    { tone: "info",     title: "Referrals convert 4× better than portals", body: "18% vs 4.1% this half-year. Portals delivered 38% of June's leads and neither of that month's two closes.", cta: "Compare sources" }
  ];

  return {
    org, levels, people, pendingRequests, joinKeys, areaUnits, types,
    properties, stages, leads, deals, commissionRules,
    conversations, automationLog,
    monthly, funnel, leaderboard, regionPerf,
    aiSuggested, aiAnswers, insights
  };
})();
