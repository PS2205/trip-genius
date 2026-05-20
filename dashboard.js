/* pages/dashboard.js - Saved Trips Dashboard & Actions Curation */


async function renderDashboard(container) {
  // Add SEO titles dynamically
  document.title = "Saved Trips - TripGenius";

  container.innerHTML = `
    <div class="dashboard-page">
      <div class="dashboard-header animated-zoom">
        <div>
          <h1>My Curated <span class="gradient-text">Trips</span></h1>
          <p style="color:var(--text-secondary); margin-top:0.25rem;">Access all your customized itineraries, packing checklists, and budgets.</p>
        </div>
        <a href="#/plan" class="premium-btn btn-small">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1rem; height:1rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Plan New Trip
        </a>
      </div>

      <div class="trips-grid" id="dashboard-trips-grid">
        <div class="loader-container" style="grid-column: 1 / -1;">
          <div class="spinner"></div>
          <p>Retrieving your saved pathways...</p>
        </div>
      </div>
    </div>
  `;

  const grid = document.getElementById('dashboard-trips-grid');

  try {
    const savedTrips = await getSavedTrips();

    if (savedTrips.length === 0) {
      grid.innerHTML = `
        <div class="dashboard-empty animated-zoom">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="empty-illustration">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.015 9.015 0 018.716 6.747M12 3a9.015 9.015 0 00-8.716 6.747m17.432 0a9.005 9.005 0 01-8.716 2.253M3.27 10.25a9.005 9.005 0 008.716 2.253m0 0A9.005 9.005 0 0112 12c.168 0 .332-.007.495-.021m-4.5 4.5a9.005 9.005 0 01-2.253-8.716m12.022 8.716a9.005 9.005 0 002.253-8.716M3.27 10.25a9.005 9.005 0 012.253-8.716m13.064 8.716a9.005 9.005 0 00-2.253-8.716" />
          </svg>
          <h3>Your Dashboard is Empty</h3>
          <p>No customized plans found in the database archive. Let's design one today!</p>
          <a href="#/plan" class="premium-btn">Create An Itinerary</a>
        </div>
      `;
      return;
    }

    grid.innerHTML = ''; // Clear loader

    savedTrips.forEach((trip, idx) => {
      // Unsplash background matching cover logic
      let coverImg = "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"; // Fallback
      const destLower = trip.destination.toLowerCase();
      if (destLower.includes("goa")) coverImg = "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80";
      else if (destLower.includes("manali")) coverImg = "https://images.unsplash.com/photo-1626621341515-bbf8a96e9859?auto=format&fit=crop&w=600&q=80";
      else if (destLower.includes("jaipur")) coverImg = "https://images.unsplash.com/photo-1477584305590-3a557efdf69b?auto=format&fit=crop&w=600&q=80";
      else if (destLower.includes("kerala")) coverImg = "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80";
      else if (destLower.includes("darjeeling")) coverImg = "https://images.unsplash.com/photo-1557971370-e7298ee473fb?auto=format&fit=crop&w=600&q=80";
      else if (destLower.includes("varanasi")) coverImg = "https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80";
      else if (destLower.includes("ladakh")) coverImg = "https://images.unsplash.com/photo-1598064971701-dcd1bd91b4ca?auto=format&fit=crop&w=600&q=80";
      else if (destLower.includes("andaman")) coverImg = "https://images.unsplash.com/photo-1589136777351-fdc9c9c853ae?auto=format&fit=crop&w=600&q=80";

      const card = document.createElement('div');
      card.className = 'trip-card animated-zoom';
      card.style.backgroundImage = `url('${coverImg}')`;
      card.style.animationDelay = `${idx * 0.05}s`;

      card.innerHTML = `
        <div class="trip-card-content">
          <span class="dest-category" style="color:var(--color-accent-orange); font-size:0.75rem;">${trip.travelStyle}</span>
          <h3 class="trip-card-dest">${trip.tripName}</h3>
          
          <div class="trip-card-meta">
            <span>📍 ${trip.destination}</span>
            <span>📅 ${trip.durationDays} Days</span>
            <span>👥 ${trip.travelersCount} Pax</span>
          </div>

          <div class="trip-card-actions">
            <a href="#/trip?id=${trip.id}" class="premium-btn btn-small trip-card-btn">
              Open Itinerary
            </a>
            <button class="trip-delete-btn" data-id="${trip.id}" title="Delete Saved Trip">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:1.2rem; height:1.2rem;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      `;

      // Deletion Handler
      const deleteBtn = card.querySelector('.trip-delete-btn');
      deleteBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (confirm(`Are you sure you want to delete "${trip.tripName}"?`)) {
          deleteBtn.disabled = true;
          try {
            await deleteTrip(trip.id);
            showToast("Trip plan deleted successfully.", "success");
            
            // Re-render dashboard to refresh list smoothly
            renderDashboard(container);
          } catch (err) {
            showToast("Failed to delete trip: " + err.message, "error");
            deleteBtn.disabled = false;
          }
        }
      });

      grid.appendChild(card);
    });

  } catch (err) {
    grid.innerHTML = `
      <div class="loader-container" style="color:var(--color-danger); grid-column:1 / -1;">
        <p>Failed to retrieve saved plans: ${err.message}</p>
      </div>
    `;
  }
}
