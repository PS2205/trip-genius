/* pages/trip.js - Gorgeous AI-Curation Trip Plan Dashboard & Dynamic Integrations */

async function renderTrip(container) {
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const demoKey = urlParams.get('demo');
  const tripId = urlParams.get('id');

  let tripData = null;

  // 1. Resolve trip data depending on URL trigger
  if (demoKey) {
    // Sandbox Demo link triggered
    tripData = getDemoTripData(demoKey);
    document.title = `${tripData.tripName} - Sandbox TripGenius`;
  } else if (tripId === 'current' && window.currentTrip) {
    // Newly generated trip in current session
    tripData = window.currentTrip;
    document.title = `${tripData.tripName} - TripGenius`;
  } else if (tripId) {
    // Load historical trip from database (Firestore or LocalStorage)
    container.innerHTML = `
      <div class="loader-container">
        <div class="spinner"></div>
        <p>Retrieving your travel blueprint from the archives...</p>
      </div>
    `;
    try {
      tripData = await getTripById(tripId);
      if (!tripData) {
        throw new Error("Itinerary not found in database.");
      }
      document.title = `${tripData.tripName} - Saved Trip`;
    } catch (e) {
      container.innerHTML = `
        <div class="loader-container" style="color:var(--color-danger)">
          <p>Failed to load itinerary: ${e.message}</p>
          <a href="#/" class="premium-btn secondary-btn" style="margin-top:1rem;">Back to Home</a>
        </div>
      `;
      return;
    }
  }

  // Fallback if no trip data resolved
  if (!tripData) {
    container.innerHTML = `
      <div class="loader-container">
        <p>No active trip plan selected.</p>
        <a href="#/plan" class="premium-btn" style="margin-top:1rem;">Plan a New Trip</a>
      </div>
    `;
    return;
  }

  // --- SAFE FALLBACK INTEGRATION FOR PREMIUM FIELDS ---
  
  // Safe Weather Fallback
  const weather = tripData.weather || {
    tempCelsius: "26°C",
    condition: "Clear & Sunny",
    humidity: "60%",
    bestTime: "October to April"
  };

  // Safe Best Time to Visit Fallback
  const bestTime = tripData.bestTimeToVisit || {
    idealMonths: ["November", "December", "January", "February"],
    peakSeason: "Winter peak season, excellent for sightseeing and sports.",
    offSeason: "Monsoons or midsummer, high discounts but wet roads.",
    summary: "Ideal times feature clear sky visibilities and gentle temperatures."
  };

  // Safe Departure Connection Fallback
  const connection = tripData.departureConnection || {
    mode: "Convenient Train / Cabin Connect",
    details: "Connecting routes via primary transport hubs. Round-trip packages available.",
    estimatedCost: "₹4,500 roundtrip",
    scheduleAlert: "Check transit timetables before boarding."
  };

  // Safe Emergency Card Fallback
  const emergency = tripData.emergencyCard || {
    numbers: [
      { label: "Local Police Help", value: "112" },
      { label: "Medical Helpline", value: "108" }
    ],
    hospitals: ["Regional Government General Hospital", "Local Medical Center"],
    touristHelpline: "1800-11-1363 (National Helpline)",
    localSafetyTips: [
      "Keep digital UPI copies handy, but carry small cash.",
      "Only hire authorized government-licensed tour operators."
    ]
  };

  // Safe Hidden Gems Fallback
  const hiddenGemsList = tripData.hiddenGems || [
    { name: "Symmetric Valley Ridge", location: "Offbeat Outskirts", description: "Quiet forest path giving stunning aerial sunrise perspectives.", whySpecial: "Skipped by tour groups, very serene." }
  ];

  // Safe Local Cuisine Fallback
  const foodList = tripData.food || [
    { dishName: "Signature Local Platter", type: "Main Platter", recommendedPlace: "Central Traditional Diner", cost: "₹250", description: "Fresh local seasonal produce prepared with traditional aromatic spices." }
  ];

  // Safe Budget Breakdown Fallback
  const budget = tripData.budgetBreakdown || {
    accommodation: 5000,
    activities: 3000,
    food: 4000,
    transport: 3000,
    shopping: 2000,
    miscellaneous: 1000,
    currency: "INR"
  };

  // Calculate dynamic percentages for the budget optimizer
  const accommodationAmt = budget.accommodation || 0;
  const activitiesAmt = budget.activities || 0;
  const foodAmt = budget.food || 0;
  const transportAmt = budget.transport || 0;
  const shoppingAmt = budget.shopping || 0;
  const miscAmt = budget.miscellaneous || 0;

  const totalBudget = (accommodationAmt + activitiesAmt + foodAmt + transportAmt + shoppingAmt + miscAmt) || 1;
  const pctAccom = Math.round((accommodationAmt / totalBudget) * 100);
  const pctActiv = Math.round((activitiesAmt / totalBudget) * 100);
  const pctFood = Math.round((foodAmt / totalBudget) * 100);
  const pctTrans = Math.round((transportAmt / totalBudget) * 100);
  const pctShop = Math.round((shoppingAmt / totalBudget) * 100);
  const pctMisc = Math.round((miscAmt / totalBudget) * 100);

  // Unsplash high quality background image selector matching destinations for premium covers
  let coverImg = "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"; // Fallback
  const destLower = tripData.destination.toLowerCase();
  if (destLower.includes("goa")) coverImg = "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80";
  else if (destLower.includes("manali")) coverImg = "https://images.unsplash.com/photo-1626621341515-bbf8a96e9859?auto=format&fit=crop&w=1200&q=80";
  else if (destLower.includes("jaipur")) coverImg = "https://images.unsplash.com/photo-1477584305590-3a557efdf69b?auto=format&fit=crop&w=1200&q=80";
  else if (destLower.includes("kerala")) coverImg = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80";
  else if (destLower.includes("darjeeling")) coverImg = "https://images.unsplash.com/photo-1557971370-e7298ee473fb?auto=format&fit=crop&w=1200&q=80";
  else if (destLower.includes("varanasi")) coverImg = "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1200&q=80";
  else if (destLower.includes("ladakh")) coverImg = "https://images.unsplash.com/photo-1598064971701-dcd1bd91b4ca?auto=format&fit=crop&w=1200&q=80";
  else if (destLower.includes("andaman")) coverImg = "https://images.unsplash.com/photo-1589136777351-fdc9c9c853ae?auto=format&fit=crop&w=1200&q=80";

  container.innerHTML = `
    <div class="trip-container">
      
      <!-- Premium Cover Header Card -->
      <section class="trip-header-card animated-zoom" style="background-image: url('${coverImg}');">
        <div class="trip-header-content">
          <div class="trip-title-area">
            <span class="dest-category" style="color: var(--color-accent-orange); font-size: 0.95rem; font-weight: 700;">AI CURATED PLANNER</span>
            <h1>${tripData.tripName}</h1>
            
            <div class="trip-meta-badges">
              <span class="meta-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                </svg>
                <span>${tripData.destination}</span>
              </span>

              <span class="meta-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span>${tripData.durationDays} Days</span>
              </span>

              <span class="meta-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <span>${tripData.travelersCount} Traveler(s)</span>
              </span>

              <span class="meta-badge">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-2.235 2.236m12.025-4.471a3 3 0 00-2.236-2.236m-3.461 4.891a3.333 3.333 0 01-4.828 0 3.333 3.333 0 00-4.828 0c-.547.547-.83 1.357-.754 2.166l.332 3.535a2.25 2.25 0 002.242 2.04h11.968a2.25 2.25 0 002.242-2.04l.332-3.535c.076-.81-.207-1.62-.754-2.166l-3.332-3.332z" />
                </svg>
                <span>${tripData.travelStyle}</span>
              </span>
            </div>
          </div>

          <!-- Dynamic actions layout (floating print, save, delete) -->
          <div class="trip-actions">
            <!-- Print/PDF -->
            <button class="premium-btn secondary-btn btn-small" id="print-trip-btn" title="Print Trip Plan or Save as PDF">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0a2.25 2.25 0 01-2.25 2.25H8.59A2.25 2.25 0 016.34 18m11.318-4.09l-.497-4.473a2.25 2.25 0 00-2.225-2.003H8.9a2.25 2.25 0 00-2.224 2.003l-.497 4.473m11.318 0a1.5 1.5 0 00-1.5-1.5H5.432a1.5 1.5 0 00-1.5 1.5M6.72 13.829h10.56" />
              </svg>
              <span>Print / PDF</span>
            </button>

            <!-- Save Trip (Conditional rendering if newly generated) -->
            ${(tripId === 'current' || demoKey) ? `
              <button class="premium-btn btn-small" id="save-trip-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <span>Save to Dashboard</span>
              </button>
            ` : `
              <span class="meta-badge" style="background: rgba(22, 101, 52, 0.2); border-color: rgba(34, 197, 94, 0.4); color: var(--color-success); font-weight:600; padding: 0.5rem 1rem;">
                Saved Itinerary
              </span>
            `}
          </div>
        </div>
      </section>

      <!-- Quick Curation Widgets Row (Weather + Cost Estimator) -->
      <section class="quick-tools-grid">
        <!-- Weather Card widget -->
        <div class="glass-card weather-card animated-zoom" style="animation-delay: 0.15s;">
          <div class="weather-main">
            <!-- Simulated Weather icon depending on conditions -->
            <div style="font-size: 3rem; animation: float 3s ease-in-out infinite;">
              ${weather.condition.toLowerCase().includes("sunny") ? "☀️" : 
                weather.condition.toLowerCase().includes("snow") ? "❄️" : "☁️"}
            </div>
            <div class="weather-temp-block">
              <div class="weather-temp">${weather.tempCelsius}</div>
              <div class="weather-condition">${weather.condition}</div>
            </div>
          </div>
          <div class="weather-details">
            <div class="weather-item">
              <span class="w-label">Humidity</span>
              <span class="w-val">${weather.humidity || "65%"}</span>
            </div>
            <div class="weather-item">
              <span class="w-label">Best Season</span>
              <span class="w-val">${weather.bestTime || "Oct - Mar"}</span>
            </div>
          </div>
        </div>

        <!-- Daily Cost Estimator Widget -->
        <div class="glass-card budget-summary-box animated-zoom" style="animation-delay: 0.2s; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 1rem 2rem;">
          <span class="title" style="font-weight:700; color:var(--text-secondary);">Cost Per Day Estimator</span>
          <span class="value" style="font-size: 1.65rem; margin-top: 0.25rem; font-weight:800; color:var(--color-primary);">${tripData.costPerDayEstimate}</span>
          <small style="color:var(--text-muted); font-size:0.75rem; margin-top: 0.5rem; font-weight:600;">Excluding flight packages</small>
        </div>
      </section>

      <!-- 1. RECOMMENDED DEPARTURE TRANSPORT CONNECTION CARD -->
      <div class="package-connection-card animated-zoom" style="animation-delay: 0.22s; margin-top: 1.5rem; background:white;">
        <div class="connection-icon" style="background:var(--color-primary);">✈️</div>
        <div style="flex:1;">
          <span class="dest-category" style="font-size:0.75rem; font-weight:700; color:var(--color-primary); margin-bottom: 2px; display:inline-block;">RECOMMENDED DEPARTURE CONNECTION</span>
          <h3 style="font-size: 1.15rem; font-weight:700; color:var(--text-primary); margin-bottom:4px;">${connection.mode}</h3>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.4;">${connection.details}</p>
          ${connection.scheduleAlert ? `<small style="display:block; color:var(--color-accent-orange); font-weight:700; margin-top:4px;">⚠️ Transit Advisory: ${connection.scheduleAlert}</small>` : ''}
        </div>
        <div style="text-align:right; flex-shrink:0;">
          <span style="font-size:0.72rem; color:var(--text-muted); display:block; font-weight:700;">EST. PACKAGED FARE</span>
          <span style="font-size: 1.35rem; font-weight:800; color:var(--color-success);">${connection.estimatedCost}</span>
        </div>
      </div>

      <!-- Main Layout: Timeline & Optimizer (Left) & Sidebar Curation (Right) -->
      <div class="trip-layout" style="margin-top: 2rem;">
        
        <!-- Day-Wise timeline block (Left) -->
        <section class="itinerary-block" style="flex: 2.2;">

          <!-- 2. AI SMART BUDGET OPTIMIZER -->
          <div class="glass-card widget-card animated-zoom" style="margin-bottom: 2.5rem; background:white; padding: 24px;">
            <h3 style="margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.5rem; height:1.5rem; color:var(--color-accent-orange);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.775-.618 1.766-.883 2.757-.788M12 3v18" />
              </svg>
              <span style="font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.2rem;">AI Smart Budget Optimizer</span>
            </h3>
            <div class="budget-opt-wrapper" style="border: none; padding: 0; background: transparent;">
              <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
                Enter your customized budget below. TripGenius automatically models live budget split ratios derived from our premium regional cost indicators.
              </p>
              
              <div style="display:flex; gap:10px; margin-bottom:20px; align-items:center; background: #f8fafc; padding: 12px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <div style="flex:1;">
                  <label for="opt-budget-input" style="font-size:0.7rem; font-weight:800; color:var(--text-muted); display:block; text-transform:uppercase; margin-bottom:2px;">TOTAL HOLIDAY BUDGET</label>
                  <div style="display:flex; align-items:center;">
                    <span style="font-size:1.2rem; font-weight:800; color:var(--color-secondary); margin-right:4px;">₹</span>
                    <input type="number" id="opt-budget-input" value="${tripData.budgetINR || totalBudget}" style="width: 100%; border: none; background: transparent; outline: none; font-size: 1.25rem; font-weight:800; color:var(--color-secondary);">
                  </div>
                </div>
                <button id="opt-recalc-btn" class="premium-btn btn-small" style="color:white; font-weight:700; box-shadow:none; padding:10px 24px; border-radius:8px;">Optimize</button>
              </div>
              
              <!-- Segmented visual bar -->
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-muted); display: block; text-transform: uppercase;">Segmented Spending Plan</span>
              <div class="budget-opt-bar" id="opt-visual-bar" style="box-shadow: inset 0 2px 4px rgba(0,0,0,0.06); border-radius: 8px;">
                <!-- Rendered dynamically -->
              </div>

              <!-- Breakdown list -->
              <div id="opt-breakdown-list" style="display:grid; grid-template-columns: 1fr 1fr; gap:12px 24px; margin-top: 15px;">
                <!-- Rendered dynamically -->
              </div>
            </div>
          </div>

          <h2>Day-Wise Curation</h2>
          
          <div class="timeline" style="margin-top:1.5rem;">
            ${tripData.dayWiseItinerary.map((day, dIdx) => `
              <div class="timeline-day animated-zoom" style="animation-delay: ${0.25 + (dIdx * 0.05)}s;">
                <span class="timeline-dot"></span>
                <div class="day-header">
                  <div class="day-label">
                    <span style="color: var(--color-accent-orange); font-weight:800;">Day ${day.day}</span>
                    <span class="day-title-sub" style="font-weight:700;">— ${day.title}</span>
                  </div>
                </div>

                <div class="glass-card day-card" style="background:white; border-color:#e2e8f0; box-shadow:0 4px 20px rgba(0,0,0,0.02); margin-left: 20px; padding: 20px;">
                  <p class="day-description" style="color:var(--text-secondary); line-height:1.5; font-size:0.95rem;">${day.description}</p>
                  
                  <div class="activities-list" style="margin-top:15px; border-top: 1px dashed #cbd5e1; padding-top:15px;">
                    ${day.activities.map(act => `
                      <div class="activity-item" style="display:flex; gap:15px; margin-bottom:15px;">
                        <div class="activity-time" style="font-weight:700; color:var(--color-primary); font-size:0.85rem; width:70px; flex-shrink:0; text-align:left;">${act.time}</div>
                        <div class="activity-details" style="flex:1;">
                          <h5 style="font-size:0.95rem; font-weight:700; color:var(--text-primary);">${act.activity}</h5>
                          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px; line-height:1.4;">${act.description}</p>
                          <div class="activity-meta" style="margin-top:6px; display:flex; gap:12px; font-size:0.78rem; color:var(--text-muted); font-weight:600;">
                            <span style="display:flex; align-items:center; gap:3px;">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:12px; height:12px; color:var(--color-accent-orange);">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                              </svg>
                              ${act.location}
                            </span>
                            <span style="display:flex; align-items:center; gap:3px;">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:12px; height:12px; color:var(--color-accent-teal);">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Est. Cost: ${act.cost}
                            </span>
                          </div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Hotels Section -->
          <div style="margin-top: 3.5rem;">
            <h2 style="margin-bottom: 1.25rem; font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.5rem;">Curation of Stays & Lodging</h2>
            <div class="hotels-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
              ${tripData.hotels.map(h => `
                <div class="glass-card hotel-card animated-zoom" style="background:white; border-color:#e2e8f0; padding:20px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
                  <div class="hotel-stars" style="color:#eab308; font-weight:700; font-size:0.9rem;">${h.rating}</div>
                  <h3 class="hotel-name" style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:4px;">${h.name}</h3>
                  <span class="hotel-price" style="display:inline-block; font-size:0.9rem; font-weight:700; color:var(--color-success); margin-top:2px;">${h.priceRange}</span>
                  <p class="day-description" style="font-size:0.85rem; color:var(--text-secondary); margin: 0.75rem 0; line-height:1.4;">${h.description}</p>
                  <small style="color:var(--color-accent-orange); font-weight:700; display:block; margin-top:8px;">★ Why Curation Chose This: ${h.whyChoose || "Excellent convenience and verified standards."}</small>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Attractions section -->
          <div style="margin-top: 3.5rem;">
            <h2 style="margin-bottom: 1.25rem; font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.5rem;">Primary Tourist Landmarks</h2>
            <div class="hotels-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
              ${tripData.attractions.map(att => `
                <div class="glass-card hotel-card animated-zoom" style="background:white; border-color:#e2e8f0; padding:20px; box-shadow:0 5px 20px rgba(0,0,0,0.03);">
                  <h3 class="hotel-name" style="color:var(--color-primary); font-size:1.1rem; font-weight:700;">${att.name}</h3>
                  <div class="activity-meta" style="margin: 0.5rem 0; display:flex; gap:12px; font-size:0.8rem; color:var(--text-muted); font-weight:600;">
                    <span>⏳ Duration: ${att.duration}</span>
                    <span>🎫 Entry: ${att.cost}</span>
                  </div>
                  <p class="day-description" style="font-size:0.85rem; color:var(--text-secondary); margin: 0; line-height:1.4;">${att.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Sidebar Curation Widgets (Right) -->
        <aside class="sidebar-widgets" style="flex: 1; display:flex; flex-direction:column; gap:25px;">
          
          <!-- 3. BEST TIME TO VISIT WIDGET -->
          <div class="glass-card widget-card animated-zoom" style="background:white; padding: 20px; box-shadow:0 5px 25px rgba(0,0,0,0.03);">
            <h3 style="margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.25rem; height:1.25rem; color:var(--color-primary);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span style="font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.1rem;">Best Time to Visit</span>
            </h3>
            <div class="best-time-container" style="background:linear-gradient(to bottom, #eff6ff, #ffffff); border-color:#cbd5e1; border-radius:12px; padding:15px; border: 1px solid #e2e8f0;">
              <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.4; margin-bottom:12px;">
                ${bestTime.summary}
              </p>
              
              <span style="font-size:0.7rem; font-weight:800; color:var(--text-muted); display:block; text-transform:uppercase; margin-bottom:6px;">SEASONAL CALENDAR</span>
              <div class="best-time-months" style="display:grid; grid-template-columns: repeat(4, 1fr); gap:6px;">
                ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => {
                  const isIdeal = bestTime.idealMonths.some(im => im.toLowerCase().startsWith(m.toLowerCase()));
                  return `<span class="month-badge ${isIdeal ? 'peak' : ''}" style="text-align:center; padding:4px 0; font-size:0.75rem; border-radius:12px; font-weight:700; ${isIdeal ? 'background:#008cff; color:white; border-color:#008cff;' : 'background:#ffffff; color:#64748b; border:1px solid #cbd5e1;'}">${m}</span>`;
                }).join('')}
              </div>

              <div style="margin-top:15px; border-top:1px dashed #cbd5e1; padding-top:12px; display:flex; flex-direction:column; gap:10px;">
                <div>
                  <span style="font-size:0.75rem; font-weight:800; color:var(--color-primary); display:block; text-transform:uppercase;">🔥 Peak Season</span>
                  <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.3; margin-top:2px;">${bestTime.peakSeason}</p>
                </div>
                <div>
                  <span style="font-size:0.75rem; font-weight:800; color:var(--color-accent-orange); display:block; text-transform:uppercase;">❄️ Off-Season</span>
                  <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.3; margin-top:2px;">${bestTime.offSeason}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. EMERGENCY TRAVEL CARD -->
          <div class="glass-card widget-card animated-zoom" style="background:white; padding: 20px; box-shadow:0 5px 25px rgba(0,0,0,0.03);">
            <h3 style="margin-bottom:12px; display:flex; align-items:center; gap:8px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.25rem; height:1.25rem; color:#ef4444;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span style="font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.1rem;">Emergency Travel Card</span>
            </h3>
            <div class="emergency-card-wrapper" style="border-left: 5px solid #ef4444; border-radius:12px; border-top:1px solid #cbd5e1; border-right:1px solid #cbd5e1; border-bottom:1px solid #cbd5e1; padding:15px; background:linear-gradient(to bottom, #fff5f5, #ffffff);">
              <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px dashed #fecaca; padding-bottom:8px; margin-bottom:8px;">
                <span style="font-weight:700; color:#ef4444; font-size:0.75rem; display:flex; align-items:center; gap:4px;">🚨 HELPLINE DIRECTORY</span>
                <span style="font-size:0.65rem; color:var(--text-muted); font-weight:700;">24x7 ASSISTANCE</span>
              </div>
              
              <div class="emergency-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:8px;">
                ${emergency.numbers.map(n => `
                  <div class="emergency-item" style="padding:6px 10px; border-radius:8px; border:1px dashed #fecaca; background:white;">
                    <h5 style="font-size:0.6rem; color:#b91c1c; font-weight:700; text-transform:uppercase; margin:0;">${n.label}</h5>
                    <p style="font-weight:800; font-size:0.82rem; color:#1e293b; margin:2px 0 0 0;">${n.value}</p>
                  </div>
                `).join('')}
              </div>

              <div style="margin-top:12px; display:flex; flex-direction:column; gap:10px;">
                <div>
                  <span style="font-size:0.7rem; font-weight:800; color:var(--text-muted); display:block; text-transform:uppercase;">🏥 NEARBY HOSPITALS</span>
                  <ul style="font-size:0.8rem; color:var(--text-secondary); margin-left:15px; margin-top:2px; line-height:1.4;">
                    ${emergency.hospitals.map(h => `<li>${h}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <span style="font-size:0.7rem; font-weight:800; color:var(--text-muted); display:block; text-transform:uppercase;">📞 STATE TOURIST HELPLINE</span>
                  <p style="font-size:0.85rem; color:var(--color-primary); font-weight:800; margin-top:2px;">${emergency.touristHelpline}</p>
                </div>
                <div>
                  <span style="font-size:0.7rem; font-weight:800; color:var(--text-muted); display:block; text-transform:uppercase;">🛡️ REGIONAL SAFETY ADVISORY</span>
                  <ul style="font-size:0.8rem; color:var(--text-secondary); margin-left:15px; margin-top:2px; line-height:1.4;">
                    ${emergency.localSafetyTips.map(tip => `<li>${tip}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Local Transport Guide -->
          <div class="glass-card widget-card animated-zoom" style="background:white; padding: 20px; box-shadow:0 5px 25px rgba(0,0,0,0.03);">
            <h3 style="margin-bottom:12px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.25rem; height:1.25rem; color:var(--color-primary);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.233-3.75a1.125 1.125 0 00-1.09-1.026H5.25" />
              </svg>
              <span style="font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.1rem;">Local Transit Guide</span>
            </h3>
            <div class="transport-details" style="display:flex; flex-direction:column; gap:10px;">
              ${tripData.transportGuide.map(t => `
                <div class="transport-item" style="display:flex; flex-direction:column; align-items:flex-start; gap:0.25rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px;">
                  <div style="display:flex; justify-content:space-between; width:100%; font-weight:700;">
                    <span class="mode" style="color:var(--text-primary); font-size:0.85rem;">🚕 ${t.mode}</span>
                    <span class="cost" style="color:var(--color-success); font-size:0.85rem;">${t.cost}</span>
                  </div>
                  <p style="font-size:0.76rem; color:var(--text-secondary); line-height:1.3; margin:2px 0 0 0;">${t.description}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Interactive Packing List checklist -->
          <div class="glass-card widget-card animated-zoom" style="background:white; padding: 20px; box-shadow:0 5px 25px rgba(0,0,0,0.03);">
            <h3 style="margin-bottom:12px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.25rem; height:1.25rem; color:var(--color-primary);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.3 0A2.25 2.25 0 0112 3.75m0 0h.008v.008H12V3.75z" />
              </svg>
              <span style="font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.1rem;">Interactive Checklist</span>
            </h3>
            <div class="packing-list" id="packing-checklist" style="display:flex; flex-direction:column; gap:8px;">
              ${tripData.packingList.map((item, index) => `
                <label class="checklist-item" data-index="${index}" style="display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-primary); cursor:pointer;">
                  <input type="checkbox" style="width:16px; height:16px; cursor:pointer;">
                  <span>${item}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Local Food recommendations -->
          <div class="glass-card widget-card animated-zoom" style="background:white; padding: 20px; box-shadow:0 5px 25px rgba(0,0,0,0.03);">
            <h3 style="margin-bottom:12px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.25rem; height:1.25rem; color:var(--color-primary);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-3h11.25M18 19.5v-12a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 7.5v12M15 19.5v-6" />
              </svg>
              <span style="font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.1rem;">Local Cuisine Curation</span>
            </h3>
            <div class="mini-grid" style="display:flex; flex-direction:column; gap:12px;">
              ${foodList.map(f => `
                <div class="mini-card" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; text-align:left;">
                  <span class="dest-category" style="font-size:0.65rem; background:#eff6ff; color:#008cff; padding:2px 8px; border-radius:20px; font-weight:700;">${f.type}</span>
                  <h4 style="font-size:0.95rem; font-weight:700; color:#0a2240; margin-top:6px;">${f.dishName}</h4>
                  <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px; line-height:1.4;">${f.description}</p>
                  <span class="meta" style="display:block; font-size:0.76rem; font-weight:700; color:var(--color-accent-orange); margin-top:6px;">🍴 Try at: ${f.recommendedPlace}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Hidden Gems section -->
          <div class="glass-card widget-card animated-zoom" style="background:white; padding: 20px; box-shadow:0 5px 25px rgba(0,0,0,0.03);">
            <h3 style="margin-bottom:12px;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.25rem; height:1.25rem; color:var(--color-accent-orange);">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.904-4.473L21 21l-1.187-5.096A9.75 9.75 0 109.813 15.904z" />
              </svg>
              <span style="font-family:var(--font-display); font-weight:700; color:#0a2240; font-size:1.1rem;">Hidden Gems Curation</span>
            </h3>
            <div class="mini-grid" style="display:flex; flex-direction:column; gap:12px;">
              ${hiddenGemsList.map(gem => `
                <div class="mini-card" style="border: 1px solid rgba(255, 90, 0, 0.25); background: rgba(255, 90, 0, 0.02); border-radius:10px; padding:12px; text-align:left;">
                  <h4 style="color: var(--color-accent-orange); font-size:0.95rem; font-weight:700; display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
                    <span>${gem.name}</span>
                    ${gem.location ? `<span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">📍 ${gem.location}</span>` : ''}
                  </h4>
                  <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px; line-height:1.4;">${gem.description}</p>
                  <small style="color:var(--text-primary); font-weight:700; display:block; margin-top:6px;">✦ Why Special: ${gem.whySpecial}</small>
                </div>
              `).join('')}
            </div>
          </div>

        </aside>

      </div>

    </div>
  `;

  // Attach interactivity listeners
  
  // 1. Print / PDF action (Triggers native window print, styled via CSS)
  document.getElementById('print-trip-btn').addEventListener('click', () => {
    window.print();
  });

  // 2. Save Trip action (Conditional check)
  const saveBtn = document.getElementById('save-trip-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      saveBtn.disabled = true;
      saveBtn.innerHTML = `
        <svg class="spinner btn-icon" style="width:1rem; height:1rem;" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke="var(--text-primary)"></circle>
        </svg>
        <span>Saving...</span>
      `;
      
      try {
        await saveTrip(tripData);
        showToast("Trip saved to dashboard successfully!", "success");
        
        // Brief timeout then redirect
        setTimeout(() => {
          window.location.hash = '#/dashboard';
        }, 800);
      } catch (err) {
        showToast("Error saving trip: " + err.message, "error");
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
          <span>Save to Dashboard</span>
        `;
      }
    });
  }

  // 3. Interactive Packing Checklist (Saves state on check)
  const checklist = document.getElementById('packing-checklist');
  const items = checklist.querySelectorAll('.checklist-item');
  
  // Try loading checked state from localStorage cache for continuity
  const stateKey = `packing_state_${tripData.tripName.replace(/\s+/g, '_')}`;
  let checkedStates = JSON.parse(localStorage.getItem(stateKey)) || {};

  items.forEach(item => {
    const index = item.getAttribute('data-index');
    const checkbox = item.querySelector('input');

    // Restore state
    if (checkedStates[index]) {
      checkbox.checked = true;
      item.classList.add('checked');
      item.style.textDecoration = 'line-through';
      item.style.opacity = '0.6';
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        item.classList.add('checked');
        item.style.textDecoration = 'line-through';
        item.style.opacity = '0.6';
        checkedStates[index] = true;
        showToast(`Packed: ${item.querySelector('span').innerText}`, "success");
      } else {
        item.classList.remove('checked');
        item.style.textDecoration = 'none';
        item.style.opacity = '1';
        delete checkedStates[index];
      }
      localStorage.setItem(stateKey, JSON.stringify(checkedStates));
    });
  });

  // 4. Interactive Smart Budget Recalculator Actions
  const optRecalcBtn = document.getElementById('opt-recalc-btn');
  const optInput = document.getElementById('opt-budget-input');

  const updateBudgetOptimizer = (newTotal) => {
    if (!newTotal || newTotal <= 0) return;
    
    // Recalculate absolute values using pre-derived percentages
    const valAccom = Math.round((pctAccom / 100) * newTotal);
    const valActiv = Math.round((pctActiv / 100) * newTotal);
    const valFood = Math.round((pctFood / 100) * newTotal);
    const valTrans = Math.round((pctTrans / 100) * newTotal);
    const valShop = Math.round((pctShop / 100) * newTotal);
    const valMisc = Math.round((pctMisc / 100) * newTotal);

    // Update segmented progress bar
    const bar = document.getElementById('opt-visual-bar');
    if (bar) {
      bar.innerHTML = `
        ${pctAccom > 0 ? `<div class="budget-opt-slice" style="width: ${pctAccom}%; background: hsl(263, 85%, 62%);" title="Hotels: ${pctAccom}%">🏨 ${pctAccom}%</div>` : ''}
        ${pctActiv > 0 ? `<div class="budget-opt-slice" style="width: ${pctActiv}%; background: hsl(22, 90%, 56%);" title="Activities: ${pctActiv}%">🧗 ${pctActiv}%</div>` : ''}
        ${pctFood > 0 ? `<div class="budget-opt-slice" style="width: ${pctFood}%; background: hsl(174, 85%, 40%);" title="Food: ${pctFood}%">🍲 ${pctFood}%</div>` : ''}
        ${pctTrans > 0 ? `<div class="budget-opt-slice" style="width: ${pctTrans}%; background: hsl(200, 80%, 50%);" title="Transport: ${pctTrans}%">✈️ ${pctTrans}%</div>` : ''}
        ${pctShop > 0 ? `<div class="budget-opt-slice" style="width: ${pctShop}%; background: hsl(240, 50%, 60%);" title="Shopping: ${pctShop}%">🛍️ ${pctShop}%</div>` : ''}
        ${pctMisc > 0 ? `<div class="budget-opt-slice" style="width: ${pctMisc}%; background: hsl(240, 5%, 45%);" title="Misc: ${pctMisc}%">✦ ${pctMisc}%</div>` : ''}
      `;
    }

    // Update breakdown grid list
    const list = document.getElementById('opt-breakdown-list');
    if (list) {
      list.innerHTML = `
        <div style="display:flex; flex-direction:column; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; text-align:left;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:hsl(263, 85%, 62%);"></span>
            STAYS & LODGING
          </span>
          <span style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-top:2px;">₹${valAccom.toLocaleString()}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; margin-top:1px;">Allocated Ratio: ${pctAccom}%</span>
        </div>

        <div style="display:flex; flex-direction:column; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; text-align:left;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:hsl(22, 90%, 56%);"></span>
            ACTIVITIES & EXCURSIONS
          </span>
          <span style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-top:2px;">₹${valActiv.toLocaleString()}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; margin-top:1px;">Allocated Ratio: ${pctActiv}%</span>
        </div>

        <div style="display:flex; flex-direction:column; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; text-align:left;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:hsl(174, 85%, 40%);"></span>
            LOCAL FOOD EXPLORER
          </span>
          <span style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-top:2px;">₹${valFood.toLocaleString()}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; margin-top:1px;">Allocated Ratio: ${pctFood}%</span>
        </div>

        <div style="display:flex; flex-direction:column; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; text-align:left;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:hsl(200, 80%, 50%);"></span>
            TRANSIT & LOCAL TAXIS
          </span>
          <span style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-top:2px;">₹${valTrans.toLocaleString()}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; margin-top:1px;">Allocated Ratio: ${pctTrans}%</span>
        </div>

        <div style="display:flex; flex-direction:column; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; text-align:left;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:hsl(240, 50%, 60%);"></span>
            LOCAL SHOPPING FUNDS
          </span>
          <span style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-top:2px;">₹${valShop.toLocaleString()}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; margin-top:1px;">Allocated Ratio: ${pctShop}%</span>
        </div>

        <div style="display:flex; flex-direction:column; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:10px; text-align:left;">
          <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:4px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:hsl(240, 5%, 45%);"></span>
            MISCELLANEOUS RESERVES
          </span>
          <span style="font-weight:800; font-size:1.1rem; color:var(--text-primary); margin-top:2px;">₹${valMisc.toLocaleString()}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); font-weight:600; margin-top:1px;">Allocated Ratio: ${pctMisc}%</span>
        </div>
      `;
    }
  };

  if (optRecalcBtn && optInput) {
    // Perform Recalculate Click behavior
    optRecalcBtn.addEventListener('click', () => {
      const budgetVal = parseInt(optInput.value);
      if (budgetVal && budgetVal > 0) {
        updateBudgetOptimizer(budgetVal);
        showToast("Trip budget splits successfully optimized!", "success");
      } else {
        showToast("Please enter a valid positive budget ceiling.", "warning");
      }
    });

    // Enter Key recalculate trigger
    optInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        optRecalcBtn.click();
      }
    });
  }

  // Initialise Budget optimizer automatically on render
  updateBudgetOptimizer(tripData.budgetINR || totalBudget);
}
