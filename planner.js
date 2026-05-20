/* pages/planner.js - Premium Multi-Step AI Questionnaire & Animated Generation Overlay */


function renderPlanner(container) {
  // Add SEO titles dynamically
  document.title = "Plan a New Trip - TripGenius";

  // Check if destination was passed as query parameter
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const prefilledDest = urlParams.get('destination') || '';

  container.innerHTML = `
    <div class="planner-page">
      <div class="hero-badge animated-zoom" style="margin: 0 auto 1rem auto; width: fit-content;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width:1rem;height:1rem;">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.64 8.38m6 6l-6.16 6.16m-6-6.16a14.98 14.98 0 0012.12 6.16M9.64 8.38a6 6 0 11-4.8 4.8" />
        </svg>
        <span>Itinerary Engine v1.5</span>
      </div>
      <h1>Design Your Next <span class="gradient-text">Adventure</span></h1>
      <p class="planner-subtitle">Specify your parameters, and let TripGenius draft a luxurious travel blueprint.</p>
      
      <div class="glass-card planner-form-container animated-zoom" style="animation-delay: 0.1s;">
        <form id="trip-planner-form" class="form-step-card">
          
          <!-- Grid 1: Destination and Style -->
          <div class="planner-grid">
            <div class="form-group">
              <label for="planner-destination">Where are you traveling to?</label>
              <input type="text" id="planner-destination" required value="${prefilledDest}" placeholder="e.g. Darjeeling, Varanasi, Paris, Ladakh..." autocomplete="off">
              <small class="form-hint">Supports Indian hotspots (Goa, Manali, Jaipur, Kerala have premium Sandbox mode) and all global cities.</small>
            </div>
            
            <div class="form-group">
              <label for="planner-budget">What is your budget level?</label>
              <select id="planner-budget" required>
                <option value="Moderate">Moderate (Comfort stays, local experiences)</option>
                <option value="Budget">Budget (Hostels, street food, public transport)</option>
                <option value="Luxury">Luxury (Resorts, private cars, heritage tours)</option>
              </select>
            </div>
          </div>

          <!-- Grid 2: Duration and Travelers -->
          <div class="planner-grid">
            <div class="form-group">
              <label for="planner-days">Number of Days</label>
              <input type="number" id="planner-days" required min="1" max="15" value="4">
              <small class="form-hint">Maximum 15 days of high-fidelity planning per generation.</small>
            </div>
            
            <div class="form-group">
              <label for="planner-travelers">Number of Travelers</label>
              <input type="number" id="planner-travelers" required min="1" max="20" value="2">
            </div>
          </div>

          <!-- Travel Style Selector Card Grid -->
          <div class="form-group" style="margin-bottom: 0.5rem;">
            <label>Select your preferred Travel Style</label>
            <div class="style-selector-grid">
              
              <!-- Beach & Adventure -->
              <label class="style-option">
                <input type="radio" name="travel-style" value="Beach & Adventure" checked>
                <div class="style-card">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  <span>Beach & Activity</span>
                </div>
              </label>

              <!-- Mountains & Adventure -->
              <label class="style-option">
                <input type="radio" name="travel-style" value="Mountains & Adventure">
                <div class="style-card">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <span>Mountains</span>
                </div>
              </label>

              <!-- Heritage & Culture -->
              <label class="style-option">
                <input type="radio" name="travel-style" value="Heritage & Culture">
                <div class="style-card">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                  <span>Culture & Art</span>
                </div>
              </label>

              <!-- Nature & Backwaters -->
              <label class="style-option">
                <input type="radio" name="travel-style" value="Nature & Backwaters">
                <div class="style-card">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75c1.637 0 3.073.805 3.947 2.031l.307.43c.097.135.25.216.415.216h1.582c.44 0 .736-.455.578-.865A8.25 8.25 0 0012 4.5a8.25 8.25 0 00-6.83 5.062c-.158.41.138.865.578.865h1.582c.166 0 .318-.081.415-.216l.307-.43A4.935 4.935 0 0112 12.75zM12 12.75v8.25" />
                  </svg>
                  <span>Backwaters</span>
                </div>
              </label>

              <!-- Spiritual & Cultural -->
              <label class="style-option">
                <input type="radio" name="travel-style" value="Spiritual & Cultural">
                <div class="style-card">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.904-4.473L21 21l-1.187-5.096A9.75 9.75 0 109.813 15.904z" />
                  </svg>
                  <span>Spiritual</span>
                </div>
              </label>

              <!-- Leisure & Wellness -->
              <label class="style-option">
                <input type="radio" name="travel-style" value="Leisure & Wellness">
                <div class="style-card">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 10.5h11.25V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18v-7.5z" />
                  </svg>
                  <span>Wellness</span>
                </div>
              </label>
              
            </div>
          </div>

          <button type="submit" class="premium-btn w-full" style="margin-top: 1.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.25rem;height:1.25rem;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l8.904-4.473L21 21l-1.187-5.096A9.75 9.75 0 109.813 15.904z" />
            </svg>
            Generate AI Trip Blueprint
          </button>
        </form>
      </div>
    </div>

    <!-- Generating Overlay hidden by default -->
    <div class="generating-overlay hidden" id="gen-overlay">
      <div class="glass-card generating-card animated-zoom">
        <div class="planet-animation">
          <div class="planet-sphere"></div>
          <div class="planet-orbit"></div>
        </div>
        
        <h2>TripGenius Curating...</h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">Designing your optimized travel blueprint. Please hold on as we query local parameters.</p>
        
        <div class="generating-steps">
          <div class="gen-step active" id="step-1">
            <span class="step-dot"></span>
            <span>Analyzing geography and regional routes...</span>
          </div>
          <div class="gen-step" id="step-2">
            <span class="step-dot"></span>
            <span>Estimating local weather conditions & climate guides...</span>
          </div>
          <div class="gen-step" id="step-3">
            <span class="step-dot"></span>
            <span>Synthesizing lodging and culinary options...</span>
          </div>
          <div class="gen-step" id="step-4">
            <span class="step-dot"></span>
            <span>Curating hidden gems and mapping packing list...</span>
          </div>
          <div class="gen-step" id="step-5">
            <span class="step-dot"></span>
            <span>Assembling structure with Gemini 1.5 Flash AI...</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach submit listeners
  const form = document.getElementById('trip-planner-form');
  const overlay = document.getElementById('gen-overlay');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gather input values
    const dest = document.getElementById('planner-destination').value;
    const budget = document.getElementById('planner-budget').value;
    const days = parseInt(document.getElementById('planner-days').value);
    const travelers = parseInt(document.getElementById('planner-travelers').value);
    
    const styleRadio = document.querySelector('input[name="travel-style"]:checked');
    const style = styleRadio ? styleRadio.value : "Exploration";

    // Engage animated overlay and show steps sequentially
    overlay.classList.remove('hidden');
    
    // Simulate beautiful progressive phases of generation
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
    }, 450); // Speed matched for real-time feel

    try {
      // Trigger AI generation
      const tripData = await generateItinerary(dest, budget, days, travelers, style);
      
      // Save it temporarily in session memory or sandbox save array (let the user review it before adding to cloud dashboard)
      // We will cache this globally in app state, then redirect to generated page
      window.currentTrip = tripData;
      
      // Stop step increments and force complete
      clearInterval(phaseInterval);
      
      // Brief timeout for visual completeness
      setTimeout(() => {
        overlay.classList.add('hidden');
        window.location.hash = `#/trip?id=current`;
      }, 300);

    } catch (err) {
      clearInterval(phaseInterval);
      overlay.classList.add('hidden');
      alert("AI Curation failed: " + err.message + ". Fallback active.");
    }
  });
}
