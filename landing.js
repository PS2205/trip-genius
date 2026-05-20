/* pages/landing.js - High-Fidelity MakeMyTrip-Style OTA Landing Page & Dynamic Comparison Engine */

function renderLanding(container) {
  // Add SEO titles dynamically
  document.title = "TripGenius - Premium AI Travel Planner & Booking Platform";

  // Mock Deals Data
  const MOCK_DEALS = [
    { title: "Goa Beach Getaway", offer: "Flat 15% OFF on Beach Stays", code: "TRIPGOA", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80" },
    { title: "Manali Snowy Escapes", offer: "Up to ₹2,500 Instant Cashback", code: "SNOWPEAK", img: "https://images.unsplash.com/photo-1626621341515-bbf8a96e9859?auto=format&fit=crop&w=400&q=80" },
    { title: "Jaipur Royal Retreat", offer: "Free Royal Heritage Tour Included", code: "ROYALROY", img: "https://images.unsplash.com/photo-1477584305590-3a557efdf69b?auto=format&fit=crop&w=400&q=80" }
  ];

  // Compare Data Source
  const COMPARE_DATA = {
    goa: {
      name: "Goa",
      duration: "4 Days",
      style: "Adventure & Beach",
      bestTime: "Nov to March (Sunny Beaches)",
      vibe: "Lively shacks, sea breezes, vibrant evening social spots",
      budget: "₹20,000",
      highlight: "Grand Island Snorkeling & Chapora Fort Sunset",
      food: "Traditional Fish Curry & Bebinca Cake",
      gem: "Butterfly Beach Trek & Kakolem Beach Lagoon"
    },
    manali: {
      name: "Manali",
      duration: "5 Days",
      style: "Alpine Adventure",
      bestTime: "Oct to June (Cool & Snowy)",
      vibe: "Mist deodar forests, river murmur, alpine snow peaks",
      budget: "₹18,000",
      highlight: "Hadimba Temple wood walk & Solang Valley Paragliding",
      food: "Wood-Fired Rainbow Trout & Hot Siddu with Ghee",
      gem: "Sethan Snow Igloo Village bouldering"
    },
    jaipur: {
      name: "Jaipur",
      duration: "3 Days",
      style: "Heritage & Culture",
      bestTime: "Oct to March (Warm & Sunny)",
      vibe: "Historic pink bazaars, majestic stone fort ramparts, folk arts",
      budget: "₹15,000",
      highlight: "Sheesh Mahal royal mirror work & Nahargarh Fort sunset view",
      food: "Dal Baati Churma & Spicy Pyaaz Kachori",
      gem: "Galtaji Monkey Temple mountain pass"
    },
    kerala: {
      name: "Kerala",
      duration: "6 Days",
      style: "Nature & Backwaters",
      bestTime: "Sept to March (Humid & Tropical)",
      vibe: "Green coconut groves, tranquil lagoon channels, misty tea gardens",
      budget: "₹45,000",
      highlight: "Luxury thatch Houseboat cruise & Munnar spice estate hikes",
      food: "Kerala Karimeen Pollichathu & Puttu Kadala Curry",
      gem: "Munroe Island mangrove canoe tour"
    }
  };

  container.innerHTML = `
    <!-- Section 1: Hero & AI Planner Booking Panel -->
    <section class="scroll-story-section hero-story-sec" id="story-sec-1" data-bg="story-bg-goa">
      
      <!-- Prominent Competition Demo Mode Button Banner -->
      <div class="scroll-trigger-element reveal-active" style="text-align: right; width: 100%; margin-bottom: 2rem;">
        <button class="premium-btn award-winning-demo-btn" id="gold-demo-btn" style="padding: 12px 28px; font-weight: 800; border-radius: 30px; animation: goldPulse 2s infinite; font-family: var(--font-display); font-size: 1rem; border: 2px solid rgba(255,255,255,0.4);">
          🏆 Generate Award-Winning Demo
        </button>
      </div>

      <div class="ota-hero-title-area scroll-trigger-element reveal-active" style="text-align: center; color: var(--text-primary); margin-bottom: 2.5rem; font-family: var(--font-display);">
        <span class="hero-badge" style="background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.15); color: var(--color-primary); display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem;">
          ✨ Next-Gen AI Travel Curation
        </span>
        <h1 style="font-size: 3.2rem; font-weight: 850; letter-spacing: -1.5px; line-height: 1.15; max-width: 850px; margin: 0 auto;">
          India's Smartest <span style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI Travel Planner</span>
        </h1>
        <p style="color: var(--text-secondary); font-size: 1.15rem; margin-top: 1rem; max-width: 650px; margin-left: auto; margin-right: auto; line-height: 1.6;">
          Experience an immersive travel curator. Instant bespoke timelines, climate grids, automated cost optimizer, and secret local hotspots.
        </p>
      </div>

      <!-- Elevated Booking Panel (Stripe / Airbnb Glassmorphism style) -->
      <div class="ota-search-panel premium-shadow scroll-trigger-element reveal-active" style="width: 100%; max-width: 1050px; margin: 0 auto; background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-glass); padding: 0; overflow: hidden;">
        
        <!-- Tabs Bar -->
        <div class="ota-tabs" style="display: flex; background: #F8FAFC; border-bottom: 1px solid var(--border-glass); justify-content: center; padding: 0 10px;">
          <button class="ota-tab-btn" data-tab="flights" style="padding: 16px 24px; border: none; background: transparent; font-weight: 700; color: var(--text-secondary); font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; border-bottom: 3px solid transparent; transition: var(--transition-fast);">
            ✈️ Flights
          </button>
          <button class="ota-tab-btn" data-tab="hotels" style="padding: 16px 24px; border: none; background: transparent; font-weight: 700; color: var(--text-secondary); font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; border-bottom: 3px solid transparent; transition: var(--transition-fast);">
            🏨 Hotels
          </button>
          <button class="ota-tab-btn" data-tab="packages" style="padding: 16px 24px; border: none; background: transparent; font-weight: 700; color: var(--text-secondary); font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; border-bottom: 3px solid transparent; transition: var(--transition-fast);">
            🧳 Holidays
          </button>
          <button class="ota-tab-btn active" data-tab="planner" style="padding: 16px 24px; border: none; background: transparent; font-weight: 700; color: var(--color-primary); font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 8px; border-bottom: 3px solid var(--color-primary); transition: var(--transition-fast);">
            🤖 AI Trip Planner
          </button>
        </div>

        <!-- Tabs Content Panels -->
        <div class="ota-tab-content" style="padding: 28px 32px;">
          
          <!-- Mock Flights Panel -->
          <div id="tab-panel-flights" class="ota-panel-view hidden">
            <div class="ota-search-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: left;">
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">FROM CITY</label>
                <input type="text" value="Kolkata (CCU)" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">TO CITY</label>
                <input type="text" placeholder="Enter Destination" value="Goa (GOI)" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">DEPARTURE DATE</label>
                <input type="date" value="2026-05-24" style="width: 100%; border: none; outline: none; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">TRAVELERS & CLASS</label>
                <input type="text" value="2 Travelers, Economy" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
            </div>
            <button class="premium-btn mock-search-btn" style="margin-top: 24px; padding: 12px 35px; border-radius: 6px;">
              Search Flights
            </button>
          </div>

          <!-- Mock Hotels Panel -->
          <div id="tab-panel-hotels" class="ota-panel-view hidden">
            <div class="ota-search-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: left;">
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; grid-column: span 2; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">CITY OR AREA</label>
                <input type="text" value="Goa, India" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">CHECK-IN DATE</label>
                <input type="date" value="2026-05-24" style="width: 100%; border: none; outline: none; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">ROOMS & GUESTS</label>
                <input type="text" value="1 Room, 2 Adults" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
            </div>
            <button class="premium-btn mock-search-btn" style="margin-top: 24px; padding: 12px 35px; border-radius: 6px;">
              Search Hotels
            </button>
          </div>

          <!-- Mock Holidays Panel -->
          <div id="tab-panel-packages" class="ota-panel-view hidden">
            <div class="ota-search-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: left;">
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">FROM CITY</label>
                <input type="text" value="Delhi" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">DESTINATION COUNTRY/CITY</label>
                <input type="text" value="Kerala Backwaters" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">DEPARTURE WEEK</label>
                <input type="text" value="Next 30 Days" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
              <div class="ota-input-box" style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fafafa;">
                <label style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">TRAVELERS COUNT</label>
                <input type="text" value="4 Travelers (Family)" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-top: 4px; background: transparent;">
              </div>
            </div>
            <button class="premium-btn mock-search-btn" style="margin-top: 24px; padding: 12px 35px; border-radius: 6px;">
              Search Holidays
            </button>
          </div>

          <!-- Active AI Trip Planner Panel -->
          <div id="tab-panel-planner" class="ota-panel-view">
            <form id="ota-planner-form">
              <div class="ota-search-grid" style="display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr; gap: 16px; text-align: left; margin-bottom: 24px;">
                
                <!-- Destination -->
                <div class="ota-input-box" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; transition: var(--transition-fast);">
                  <label for="ota-destination" style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 2px;">DESTINATION</label>
                  <input type="text" id="ota-destination" required placeholder="e.g. Darjeeling, Ladakh..." value="Goa" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); background: transparent;">
                </div>

                <!-- From City -->
                <div class="ota-input-box" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; transition: var(--transition-fast);">
                  <label for="ota-from-city" style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 2px;">FROM CITY</label>
                  <input type="text" id="ota-from-city" required placeholder="e.g. Kolkata, Delhi" value="Kolkata" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); background: transparent;">
                </div>

                <!-- Budget in INR -->
                <div class="ota-input-box" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; transition: var(--transition-fast);">
                  <label for="ota-budget" style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 2px;">TOTAL BUDGET (₹)</label>
                  <input type="number" id="ota-budget" required min="5000" step="1000" value="20000" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); background: transparent;">
                </div>

                <!-- Days and Travelers in mini columns -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  <div class="ota-input-box" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; transition: var(--transition-fast);">
                    <label for="ota-days" style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 2px;">DAYS</label>
                    <input type="number" id="ota-days" required min="1" max="15" value="4" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); text-align: center; background: transparent;">
                  </div>
                  <div class="ota-input-box" style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; text-align: center; transition: var(--transition-fast);">
                    <label for="ota-travelers" style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 2px;">PAX</label>
                    <input type="number" id="ota-travelers" required min="1" max="15" value="2" style="width: 100%; border: none; outline: none; font-size: 1rem; font-weight: 700; color: var(--text-primary); text-align: center; background: transparent;">
                  </div>
                </div>

              </div>

              <!-- Mood/Style Row -->
              <div style="text-align: left; margin-bottom: 24px;">
                <label style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 10px;">SELECT TRIP STYLE / MOOD</label>
                <div class="mood-selector-container" style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <label class="mood-pill-option" style="cursor: pointer;">
                    <input type="radio" name="ota-mood" value="Adventure" checked style="display:none;">
                    <span class="mood-pill" style="display: inline-block; padding: 7px 18px; border-radius: 20px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.85rem; transition: var(--transition-fast);">🧗 Adventure</span>
                  </label>
                  <label class="mood-pill-option" style="cursor: pointer;">
                    <input type="radio" name="ota-mood" value="Relaxation" style="display:none;">
                    <span class="mood-pill" style="display: inline-block; padding: 7px 18px; border-radius: 20px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.85rem; transition: var(--transition-fast);">🏖️ Relaxation</span>
                  </label>
                  <label class="mood-pill-option" style="cursor: pointer;">
                    <input type="radio" name="ota-mood" value="Romantic" style="display:none;">
                    <span class="mood-pill" style="display: inline-block; padding: 7px 18px; border-radius: 20px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.85rem; transition: var(--transition-fast);">💖 Romantic</span>
                  </label>
                  <label class="mood-pill-option" style="cursor: pointer;">
                    <input type="radio" name="ota-mood" value="Family" style="display:none;">
                    <span class="mood-pill" style="display: inline-block; padding: 7px 18px; border-radius: 20px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.85rem; transition: var(--transition-fast);">👨‍👩‍👧 Family</span>
                  </label>
                  <label class="mood-pill-option" style="cursor: pointer;">
                    <input type="radio" name="ota-mood" value="Solo" style="display:none;">
                    <span class="mood-pill" style="display: inline-block; padding: 7px 18px; border-radius: 20px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.85rem; transition: var(--transition-fast);">🚶 Solo</span>
                  </label>
                  <label class="mood-pill-option" style="cursor: pointer;">
                    <input type="radio" name="ota-mood" value="Luxury" style="display:none;">
                    <span class="mood-pill" style="display: inline-block; padding: 7px 18px; border-radius: 20px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.85rem; transition: var(--transition-fast);">💎 Luxury</span>
                  </label>
                  <label class="mood-pill-option" style="cursor: pointer;">
                    <input type="radio" name="ota-mood" value="Backpacking" style="display:none;">
                    <span class="mood-pill" style="display: inline-block; padding: 7px 18px; border-radius: 20px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 0.85rem; transition: var(--transition-fast);">🎒 Backpacking</span>
                  </label>
                </div>
              </div>

              <!-- Submit button -->
              <div style="text-align: center;">
                <button type="submit" class="premium-btn" style="padding: 14px 45px; border-radius: 8px; width: 100%; max-width: 320px; font-weight: 750; font-size: 1.05rem; letter-spacing: 0.5px; text-transform: uppercase; font-family: var(--font-display);">
                  Curate AI Holiday Plan
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>

    <!-- Active Loading Overlay (Simulated Curation Wizard) -->
    <div class="generating-overlay hidden" id="gen-overlay">
      <div class="glass-card generating-card animated-zoom" style="background: rgba(255,255,255,0.95); max-width: 500px; border: 1px solid var(--border-glass);">
        <div class="planet-animation">
          <div class="planet-sphere" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);"></div>
          <div class="planet-orbit" style="border-color: rgba(37, 99, 235, 0.3);"></div>
        </div>
        <h2 style="font-family: var(--font-display); font-weight: 800; font-size: 1.6rem; color: var(--text-primary);">TripGenius Curation...</h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">Blueprinting your premium travel itinerary.</p>
        <div class="generating-steps" style="text-align: left;">
          <div class="gen-step active" id="step-1"><span class="step-dot" style="background: var(--color-primary);"></span><span>Analyzing regional transport connections...</span></div>
          <div class="gen-step" id="step-2"><span class="step-dot" style="background: var(--color-primary);"></span><span>Calculating smart budget splits in INR...</span></div>
          <div class="gen-step" id="step-3"><span class="step-dot" style="background: var(--color-primary);"></span><span>Synthesizing lodging and famous local food explorer...</span></div>
          <div class="gen-step" id="step-4"><span class="step-dot" style="background: var(--color-primary);"></span><span>Mapping safety tip cards & hidden gem coves...</span></div>
          <div class="gen-step" id="step-5"><span class="step-dot" style="background: var(--color-primary);"></span><span>Assembling complete award-winning portfolio...</span></div>
        </div>
      </div>
    </div>

    <!-- Section 2: Why TripGenius & Animated Stats -->
    <section class="scroll-story-section" id="story-sec-2" data-bg="story-bg-manali">
      <div class="scroll-trigger-element" style="text-align: center; margin-bottom: 4rem;">
        <span style="background: rgba(20, 184, 166, 0.08); border: 1px solid rgba(20, 184, 166, 0.18); color: var(--color-secondary); padding: 5px 15px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Why TripGenius</span>
        <h2 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 850; color: var(--text-primary); margin-top: 8px;">Smart AI Holiday Blueprinting</h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem; max-width: 600px; margin: 10px auto 0 auto; line-height: 1.6;">Our algorithms eliminate standard tourist traps, curating bespoke plans with high fidelity.</p>
      </div>

      <!-- Features SaaS Grid -->
      <div class="features-grid scroll-trigger-element" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
        <div class="feature-card floating-card-wrapper premium-shadow" style="background: var(--bg-card); padding: 32px 24px; border-radius: 12px; border: 1px solid var(--border-glass); text-align: left;">
          <div class="feature-icon-wrapper" style="background: rgba(37, 99, 235, 0.08); color: var(--color-primary); border: 1px solid rgba(37, 99, 235, 0.15); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px;">
            📊
          </div>
          <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin-bottom: 10px;">Smart Budget Optimizer</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">Specify any budget ceiling and our algorithms formulate mathematically logical splits across Transport, Hotels, Food, Activities, and Shopping in INR.</p>
        </div>

        <div class="feature-card floating-card-wrapper premium-shadow" style="background: var(--bg-card); padding: 32px 24px; border-radius: 12px; border: 1px solid var(--border-glass); text-align: left;">
          <div class="feature-icon-wrapper" style="background: rgba(20, 184, 166, 0.08); color: var(--color-secondary); border: 1px solid rgba(20, 184, 166, 0.15); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px;">
            🌦️
          </div>
          <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin-bottom: 10px;">Best Time to Visit Widget</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">Provides an interactive monthly grid with micro-climate statistics, seasonal indices, and peak vs off-season guides so you never arrive underprepared.</p>
        </div>

        <div class="feature-card floating-card-wrapper premium-shadow" style="background: var(--bg-card); padding: 32px 24px; border-radius: 12px; border: 1px solid var(--border-glass); text-align: left;">
          <div class="feature-icon-wrapper" style="background: rgba(245, 158, 11, 0.08); color: var(--color-accent-orange); border: 1px solid rgba(245, 158, 11, 0.15); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px;">
            🧭
          </div>
          <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin-bottom: 10px;">Hidden Gems Curation</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">Avoids crowded traps. Integrates tranquil secret coves, stepwells, and mountain pass routes with real physical landmark badges.</p>
        </div>
      </div>

      <!-- Startup Metric Stats Section -->
      <div class="scroll-trigger-element" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 4.5rem; background: rgba(255,255,255,0.6); backdrop-filter: blur(10px); padding: 30px; border-radius: 16px; border: 1px solid var(--border-glass);">
        <div style="text-align: center;">
          <span class="animated-counter-label">50,000+</span>
          <p style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 600; margin-top: 4px;">Happy Explorers</p>
        </div>
        <div style="text-align: center;">
          <span class="animated-counter-label">150+</span>
          <p style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 600; margin-top: 4px;">Secret Hotspots Mapped</p>
        </div>
        <div style="text-align: center;">
          <span class="animated-counter-label">99.4%</span>
          <p style="font-size: 0.9rem; color: var(--text-secondary); font-weight: 600; margin-top: 4px;">Plan Accuracy Score</p>
        </div>
      </div>
    </section>

    <!-- Section 3: Popular Indian Destinations -->
    <section class="scroll-story-section" id="story-sec-3" data-bg="story-bg-jaipur">
      <div class="scroll-trigger-element" style="text-align: left; margin-bottom: 3rem; width: 100%;">
        <span style="background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.15); color: var(--color-primary); padding: 5px 15px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Inspiration</span>
        <h2 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 850; color: var(--text-primary); margin-top: 8px;">Trending Destinations</h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem; margin-top: 6px;">Click to load high-fidelity pre-designed demo trips instantly, or customize using parameters above.</p>
      </div>

      <div class="destinations-grid scroll-trigger-element" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%;">
        
        <!-- Goa Card -->
        <div class="destination-card floating-card-wrapper hover-zoom-container premium-shadow premium-shadow-hover" data-dest="Goa" data-demo="goa" style="border-radius: 12px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-glass); cursor: pointer;">
          <div class="dest-img-placeholder" style="background-image: url('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80'); height: 200px; background-size: cover; background-position: center;"></div>
          <div style="padding: 20px; text-align: left;">
            <span style="font-size: 0.7rem; font-weight: 750; text-transform: uppercase; color: var(--color-primary); letter-spacing: 0.5px;">Beach & Adventure</span>
            <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin: 4px 0 8px 0;">Goa</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 15px;">Sunny shorelines, sea breezes, snorkeling coves, and traditional Bebinca coconut cakes.</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary);">Launch Demo Trip</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 1.1rem; height: 1.1rem; color: var(--color-primary);"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </div>
          </div>
        </div>

        <!-- Manali Card -->
        <div class="destination-card floating-card-wrapper hover-zoom-container premium-shadow premium-shadow-hover" data-dest="Manali" data-demo="manali" style="border-radius: 12px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-glass); cursor: pointer;">
          <div class="dest-img-placeholder" style="background-image: url('https://images.unsplash.com/photo-1626621341515-bbf8a96e9859?auto=format&fit=crop&w=600&q=80'); height: 200px; background-size: cover; background-position: center;"></div>
          <div style="padding: 20px; text-align: left;">
            <span style="font-size: 0.7rem; font-weight: 750; text-transform: uppercase; color: var(--color-secondary); letter-spacing: 0.5px;">Mountains & Active</span>
            <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin: 4px 0 8px 0;">Manali</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 15px;">Snowcapped peak walks, river murmur, Solang valley paragliding, and cozy igloo retreats.</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-secondary);">Launch Demo Trip</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 1.1rem; height: 1.1rem; color: var(--color-secondary);"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </div>
          </div>
        </div>

        <!-- Jaipur Card -->
        <div class="destination-card floating-card-wrapper hover-zoom-container premium-shadow premium-shadow-hover" data-dest="Jaipur" data-demo="jaipur" style="border-radius: 12px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-glass); cursor: pointer;">
          <div class="dest-img-placeholder" style="background-image: url('https://images.unsplash.com/photo-1477584305590-3a557efdf69b?auto=format&fit=crop&w=600&q=80'); height: 200px; background-size: cover; background-position: center;"></div>
          <div style="padding: 20px; text-align: left;">
            <span style="font-size: 0.7rem; font-weight: 750; text-transform: uppercase; color: var(--color-accent-orange); letter-spacing: 0.5px;">Heritage & Culture</span>
            <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin: 4px 0 8px 0;">Jaipur</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 15px;">Majestic hilltop fortresses, symmetric stepwells, bazaar walks, and Dal Baati cuisine.</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-accent-orange);">Launch Demo Trip</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 1.1rem; height: 1.1rem; color: var(--color-accent-orange);"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </div>
          </div>
        </div>

        <!-- Kerala Card -->
        <div class="destination-card floating-card-wrapper hover-zoom-container premium-shadow premium-shadow-hover" data-dest="Kerala" data-demo="kerala" style="border-radius: 12px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-glass); cursor: pointer;">
          <div class="dest-img-placeholder" style="background-image: url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80'); height: 200px; background-size: cover; background-position: center;"></div>
          <div style="padding: 20px; text-align: left;">
            <span style="font-size: 0.7rem; font-weight: 750; text-transform: uppercase; color: var(--color-secondary); letter-spacing: 0.5px;">Nature & Backwaters</span>
            <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin: 4px 0 8px 0;">Kerala</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 15px;">Luxury houseboat cruise streams, misty Munnar spice estates, and serene Vagamon pine hills.</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-secondary);">Launch Demo Trip</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 1.1rem; height: 1.1rem; color: var(--color-secondary);"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </div>
          </div>
        </div>

        <!-- Darjeeling Card -->
        <div class="destination-card floating-card-wrapper hover-zoom-container premium-shadow premium-shadow-hover" data-dest="Darjeeling" style="border-radius: 12px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-glass); cursor: pointer;">
          <div class="dest-img-placeholder" style="background-image: url('https://images.unsplash.com/photo-1557971370-e7298ee473fb?auto=format&fit=crop&w=600&q=80'); height: 200px; background-size: cover; background-position: center;"></div>
          <div style="padding: 20px; text-align: left;">
            <span style="font-size: 0.7rem; font-weight: 750; text-transform: uppercase; color: var(--color-primary); letter-spacing: 0.5px;">Hills & Tea Gardens</span>
            <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin: 4px 0 8px 0;">Darjeeling</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 15px;">Green tea ridges, narrow-gauge steam railways, and early spectacular Tiger Hill sunrises.</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary);">Plan Custom Trip</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 1.1rem; height: 1.1rem; color: var(--color-primary);"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </div>
          </div>
        </div>

        <!-- Ladakh Card -->
        <div class="destination-card floating-card-wrapper hover-zoom-container premium-shadow premium-shadow-hover" data-dest="Ladakh" style="border-radius: 12px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-glass); cursor: pointer;">
          <div class="dest-img-placeholder" style="background-image: url('https://images.unsplash.com/photo-1598064971701-dcd1bd91b4ca?auto=format&fit=crop&w=600&q=80'); height: 200px; background-size: cover; background-position: center;"></div>
          <div style="padding: 20px; text-align: left;">
            <span style="font-size: 0.7rem; font-weight: 750; text-transform: uppercase; color: var(--color-secondary); letter-spacing: 0.5px;">Road Trip & Adventure</span>
            <h3 style="font-family: var(--font-display); font-weight: 750; font-size: 1.25rem; color: var(--text-primary); margin: 4px 0 8px 0;">Ladakh</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 15px;">Mountain passes, salt lakes, monasteries, and winding deep highway valley roads.</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-secondary);">Plan Custom Trip</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 1.1rem; height: 1.1rem; color: var(--color-secondary);"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Section 4: Compare Trips Feature & Deals -->
    <section class="scroll-story-section" id="story-sec-4" data-bg="story-bg-kerala">
      <div class="scroll-trigger-element" style="text-align: center; margin-bottom: 3.5rem;">
        <span style="background: rgba(20, 184, 166, 0.08); border: 1px solid rgba(20, 184, 166, 0.18); color: var(--color-secondary); padding: 5px 15px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Decision Helper</span>
        <h2 style="font-family: var(--font-display); font-size: 2.4rem; font-weight: 850; color: var(--text-primary); margin-top: 8px;">Compare Indian Hotspots</h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem; max-width: 600px; margin: 10px auto 0 auto; line-height: 1.6;">Weigh budget scales, styles, landmarks, food, and hidden gems side-by-side.</p>
      </div>

      <div class="scroll-trigger-element" style="display: grid; grid-template-columns: 2fr 1fr; gap: 32px; width: 100%; align-items: start;">
        
        <!-- Comparison Card -->
        <div class="compare-card premium-shadow" style="background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-glass); padding: 24px;">
          <div class="compare-selector-row" style="display: flex; justify-content: center; align-items: center; margin-bottom: 24px;">
            <select id="compare-dest-1" class="compare-select" style="background: #f8fafc; border: 1px solid var(--border-glass); padding: 8px 16px; border-radius: 8px; font-size: 0.95rem; font-weight: 600; color: var(--text-primary); outline: none;">
              <option value="goa" selected>🌴 Goa (Beach & Adventure)</option>
              <option value="manali">🏔️ Manali (Mountains & Active)</option>
              <option value="jaipur">👑 Jaipur (Heritage & Culture)</option>
              <option value="kerala">🚣 Kerala (Nature & Backwaters)</option>
            </select>
            <span style="font-weight: 800; color: var(--text-muted); font-size: 1rem; padding: 0 16px;">VS</span>
            <select id="compare-dest-2" class="compare-select" style="background: #f8fafc; border: 1px solid var(--border-glass); padding: 8px 16px; border-radius: 8px; font-size: 0.95rem; font-weight: 600; color: var(--text-primary); outline: none;">
              <option value="goa">🌴 Goa (Beach & Adventure)</option>
              <option value="manali" selected>🏔️ Manali (Mountains & Active)</option>
              <option value="jaipur">👑 Jaipur (Heritage & Culture)</option>
              <option value="kerala">🚣 Kerala (Nature & Backwaters)</option>
            </select>
          </div>

          <table class="compare-table" id="comparison-table" style="width: 100%; border-collapse: collapse;">
            <!-- Dynamically Rendered -->
          </table>
        </div>

        <!-- Deals Column -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="text-align: left; margin-bottom: 5px;">
            <h4 style="font-family: var(--font-display); font-weight: 750; font-size: 1.15rem; color: var(--text-primary);">Exclusive Deals</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">Simulated promotional booking coupons.</p>
          </div>
          
          ${MOCK_DEALS.map(deal => `
            <div class="deal-card premium-shadow" style="background: var(--bg-card); padding: 16px; border-radius: 10px; border: 1px solid var(--border-glass); display: flex; gap: 14px; align-items: center; text-align: left; transition: var(--transition-fast);">
              <div style="width: 60px; height: 60px; border-radius: 8px; background-image: url('${deal.img}'); background-size: cover; background-position: center; flex-shrink: 0;"></div>
              <div>
                <span style="font-size: 0.65rem; font-weight: 750; color: var(--color-primary); background: rgba(37, 99, 235, 0.08); padding: 2px 6px; border-radius: 4px; display: inline-block;">LIMITED PROMO</span>
                <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 2px 0 1px 0;">${deal.title}</h4>
                <p style="font-size: 0.8rem; color: var(--color-secondary); font-weight: 600;">${deal.offer}</p>
                <code style="font-size: 0.7rem; background: #f1f5f9; padding: 1px 5px; border-radius: 4px; display: inline-block; margin-top: 3px; font-weight: 700; color: var(--text-primary);">Code: ${deal.code}</code>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Section 5: FAQs & Call To Action Banner -->
    <section class="scroll-story-section" id="story-sec-5" data-bg="story-bg-ladakh">
      <div class="scroll-trigger-element" style="text-align: center; margin-bottom: 3.5rem;">
        <span style="background: rgba(37, 99, 235, 0.08); border: 1px solid rgba(37, 99, 235, 0.15); color: var(--color-primary); padding: 5px 15px; border-radius: 30px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">FAQ Curation</span>
        <h2 style="font-family: var(--font-display); font-size: 2.4rem; font-weight: 850; color: var(--text-primary); margin-top: 8px;">Frequently Asked Questions</h2>
        <p style="color: var(--text-secondary); font-size: 1.05rem; max-width: 600px; margin: 10px auto 0 auto;">Everything you need to know about TripGenius artificial intelligence planning.</p>
      </div>

      <!-- FAQ Accordion -->
      <div class="faq-container scroll-trigger-element" style="max-width: 800px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 12px; margin-bottom: 5rem;">
        <div class="faq-item" style="background: var(--bg-card); border-radius: 10px; border: 1px solid var(--border-glass); overflow: hidden; cursor: pointer; transition: var(--transition-fast);">
          <div class="faq-question" style="padding: 18px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; color: var(--text-primary);">
            <span>How does the AI create custom itineraries?</span>
            <span style="color: var(--color-primary);">➕</span>
          </div>
          <div class="faq-answer" style="padding: 0 24px 18px 24px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; text-align: left; display: none;">
            TripGenius uses Google Gemini 1.5 Flash to process your inputs (Destination, Departure City, Travel Style, Budget, Duration) and matches them against geographical flight linkages and verified local travel directories to construct an optimized, day-wise timeline.
          </div>
        </div>

        <div class="faq-item" style="background: var(--bg-card); border-radius: 10px; border: 1px solid var(--border-glass); overflow: hidden; cursor: pointer; transition: var(--transition-fast);">
          <div class="faq-question" style="padding: 18px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; color: var(--text-primary);">
            <span>What if I don't have a Gemini API key?</span>
            <span style="color: var(--color-primary);">➕</span>
          </div>
          <div class="faq-answer" style="padding: 0 24px 18px 24px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; text-align: left; display: none;">
            No worries! TripGenius features a comprehensive **High-Fidelity Sandbox Mode**. You can browse beautiful, pre-designed premium plans for Goa, Manali, Jaipur, and Kerala instantly, or enjoy rule-based custom plans completely offline.
          </div>
        </div>

        <div class="faq-item" style="background: var(--bg-card); border-radius: 10px; border: 1px solid var(--border-glass); overflow: hidden; cursor: pointer; transition: var(--transition-fast);">
          <div class="faq-question" style="padding: 18px 24px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; color: var(--text-primary);">
            <span>Can I save my trips and print them as PDFs?</span>
            <span style="color: var(--color-primary);">➕</span>
          </div>
          <div class="faq-answer" style="padding: 0 24px 18px 24px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; text-align: left; display: none;">
            Absolutely! You can register or simulate a login session to save multiple trip plans to your private Saved Trips Dashboard. Each generated holiday sheet is fully print-optimized so clicking "Print / PDF" formats the page beautifully.
          </div>
        </div>
      </div>

      <!-- Immersive CTA Section Banner (Stripe Blue-Teal Gradient style) -->
      <div class="scroll-trigger-element premium-shadow" style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); color: white; border-radius: 16px; padding: 80px 40px; text-align: center; width: 100%; border: 1px solid rgba(255,255,255,0.1);">
        <h2 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 850; line-height: 1.2; margin-bottom: 12px; color: white;">Ready to Discover Incredible India?</h2>
        <p style="color: rgba(255,255,255,0.85); font-size: 1.15rem; max-width: 600px; margin: 0 auto 35px auto; line-height: 1.6;">Blue-ribbon corporate, solo, or family vacations in a single click using next-generation generative AI.</p>
        <button class="premium-btn" id="cta-focus-btn" style="background: #ffffff; color: var(--color-primary); border: none; padding: 14px 40px; border-radius: 8px; font-weight: 800; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
          Get Started Now
        </button>
      </div>
    </section>
  `;

  // --- INTERACTIVE EVENT WIRINGS ---

  // 1. Tab Swaps in OTA booking header
  const tabBtns = container.querySelectorAll('.ota-tab-btn');
  const panels = container.querySelectorAll('.ota-panel-view');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      
      // Update buttons active class
      tabBtns.forEach(b => b.classList.remove('active'));
      tabBtns.forEach(b => b.style.color = '#475569');
      tabBtns.forEach(b => b.style.borderBottomColor = 'transparent');

      btn.classList.add('active');
      btn.style.color = '#008cff';
      btn.style.borderBottomColor = '#008cff';

      // Show target panel, hide others
      panels.forEach(p => p.classList.add('hidden'));
      const activePanel = document.getElementById(`tab-panel-${tabTarget}`);
      if (activePanel) activePanel.classList.remove('hidden');
    });
  });

  // Mock searches trigger simulation toast
  const mockSearchBtns = container.querySelectorAll('.mock-search-btn');
  mockSearchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast("Mock search query executed! Try the AI Trip Planner tab to see real-time AI generations.", "info");
    });
  });

  // Mood/Style pill radio selectors styling
  const moodLabels = container.querySelectorAll('.mood-pill-option');
  const updateMoodPills = () => {
    moodLabels.forEach(label => {
      const radio = label.querySelector('input');
      const pill = label.querySelector('.mood-pill');
      if (radio.checked) {
        pill.style.background = '#008cff';
        pill.style.color = 'white';
        pill.style.borderColor = '#008cff';
      } else {
        pill.style.background = 'transparent';
        pill.style.color = '#475569';
        pill.style.borderColor = '#cbd5e1';
      }
    });
  };

  moodLabels.forEach(label => {
    const radio = label.querySelector('input');
    radio.addEventListener('change', updateMoodPills);
  });
  updateMoodPills(); // Initial styling

  // 2. Dynamic Comparison Widget Table Logic
  const compSelect1 = document.getElementById('compare-dest-1');
  const compSelect2 = document.getElementById('compare-dest-2');
  const compTable = document.getElementById('comparison-table');

  const updateComparisonTable = () => {
    const dKey1 = compSelect1.value;
    const dKey2 = compSelect2.value;

    const data1 = COMPARE_DATA[dKey1];
    const data2 = COMPARE_DATA[dKey2];

    if (!data1 || !data2) return;

    compTable.innerHTML = `
      <thead>
        <tr>
          <th class="compare-feature-name">Feature Curation</th>
          <th>${data1.name} Plan</th>
          <th>${data2.name} Plan</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="compare-feature-name">⌛ Duration</td>
          <td>${data1.duration}</td>
          <td>${data2.duration}</td>
        </tr>
        <tr>
          <td class="compare-feature-name">⛺ Travel Vibe</td>
          <td>${data1.style}</td>
          <td>${data2.style}</td>
        </tr>
        <tr>
          <td class="compare-feature-name">🌤️ Best Time</td>
          <td>${data1.bestTime}</td>
          <td>${data2.bestTime}</td>
        </tr>
        <tr>
          <td class="compare-feature-name">💆 Vibe & Aura</td>
          <td>${data1.vibe}</td>
          <td>${data2.vibe}</td>
        </tr>
        <tr>
          <td class="compare-feature-name">💵 Est. Budget</td>
          <td style="color:#15803d; font-weight:700;">${data1.budget}</td>
          <td style="color:#15803d; font-weight:700;">${data2.budget}</td>
        </tr>
        <tr>
          <td class="compare-feature-name">⭐ Top Landmark</td>
          <td>${data1.highlight}</td>
          <td>${data2.highlight}</td>
        </tr>
        <tr>
          <td class="compare-feature-name">🍲 Famous Dish</td>
          <td>${data1.food}</td>
          <td>${data2.food}</td>
        </tr>
        <tr>
          <td class="compare-feature-name">💎 Hidden Gem</td>
          <td style="color:#ff5a00; font-weight:600;">${data1.gem}</td>
          <td style="color:#ff5a00; font-weight:600;">${data2.gem}</td>
        </tr>
      </tbody>
    `;
  };

  if (compSelect1 && compSelect2) {
    compSelect1.addEventListener('change', updateComparisonTable);
    compSelect2.addEventListener('change', updateComparisonTable);
    updateComparisonTable(); // Render initial
  }

  // 3. Expandable FAQ Accordion
  const faqs = container.querySelectorAll('.faq-item');
  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      faq.classList.toggle('active');
      const toggleSpan = faq.querySelector('.faq-question span:last-child');
      if (toggleSpan) {
        toggleSpan.innerText = faq.classList.contains('active') ? "➖" : "➕";
      }
    });
  });

  // 4. "Curate AI Holiday Plan" Form submission handler
  const plannerForm = document.getElementById('ota-planner-form');
  const overlay = document.getElementById('gen-overlay');

  plannerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dest = document.getElementById('ota-destination').value;
    const fromCity = document.getElementById('ota-from-city').value;
    const budget = parseInt(document.getElementById('ota-budget').value);
    const days = parseInt(document.getElementById('ota-days').value);
    const travelers = parseInt(document.getElementById('ota-travelers').value);
    const styleRadio = container.querySelector('input[name="ota-mood"]:checked');
    const style = styleRadio ? styleRadio.value : "Adventure";

    // Show progressive curation loader wizard overlay
    overlay.classList.remove('hidden');

    const stepElements = [
      document.getElementById('step-1'),
      document.getElementById('step-2'),
      document.getElementById('step-3'),
      document.getElementById('step-4'),
      document.getElementById('step-5')
    ];

    let currentPhase = 0;
    const phaseInterval = setInterval(() => {
      if (currentPhase < 4) {
        stepElements[currentPhase].classList.remove('active');
        stepElements[currentPhase].classList.add('completed');
        currentPhase++;
        stepElements[currentPhase].classList.add('active');
      } else {
        clearInterval(phaseInterval);
      }
    }, 450);

    try {
      // Call standard generate Itinerary
      const tripData = await generateItinerary(dest, "Moderate", days, travelers, style);
      
      // Inject customized fields
      tripData.fromCity = fromCity;
      tripData.budgetLevel = `${style} Holiday`;
      tripData.budgetINR = budget;
      
      // Save globally
      window.currentTrip = tripData;
      clearInterval(phaseInterval);

      setTimeout(() => {
        overlay.classList.add('hidden');
        window.location.hash = `#/trip?id=current`;
      }, 300);

    } catch (err) {
      clearInterval(phaseInterval);
      overlay.classList.add('hidden');
      showToast("Curation failed: " + err.message, "error");
    }
  });

  // 5. Promotional "Generate Award-Winning Demo" wiring
  const handleAwardDemo = () => {
    showToast("Generating award-winning preloaded Goa demo...", "success");
    setTimeout(() => {
      window.location.hash = '#/trip?demo=goa';
    }, 400);
  };

  const goldDemoBtn = document.getElementById('gold-demo-btn');
  if (goldDemoBtn) goldDemoBtn.addEventListener('click', handleAwardDemo);

  // Focus CTA button sends viewport back to AI Trip Planner tab
  const ctaBtn = document.getElementById('cta-focus-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      // Click Planner tab button first
      const plannerTab = container.querySelector('.ota-tab-btn[data-tab="planner"]');
      if (plannerTab) plannerTab.click();
      // Scroll to booking panel
      const searchPanel = container.querySelector('.ota-search-panel');
      if (searchPanel) {
        searchPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // 6. Popular Destination Cards click behaviors
  const destCards = container.querySelectorAll('.destination-card');
  destCards.forEach(card => {
    card.addEventListener('click', () => {
      const demoKey = card.getAttribute('data-demo');
      const destName = card.getAttribute('data-dest');

      if (demoKey) {
        window.location.hash = `#/trip?demo=${demoKey}`;
      } else {
        // Scroll to search panel, set To Destination
        const otaDestInput = document.getElementById('ota-destination');
        if (otaDestInput) {
          otaDestInput.value = destName;
          const plannerTab = container.querySelector('.ota-tab-btn[data-tab="planner"]');
          if (plannerTab) plannerTab.click();
          
          const searchPanel = container.querySelector('.ota-search-panel');
          if (searchPanel) {
            searchPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    });
  });
}
