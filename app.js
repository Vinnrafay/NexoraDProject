// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000, // Longer, smoother animations
      easing: 'ease-out',
      once: true,
      mirror: false
    });
  }

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Handle Navbar styling on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('glass', 'border-b', 'border-white/5');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('glass', 'border-b', 'border-white/5');
      navbar.classList.add('bg-transparent');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Initialize Interactive Elements
  initDashboardPreview();
  initCommandPaletteTyping();
  initCommandPaletteShortcuts();
});

// Typing simulation for Hero Command Palette
function initCommandPaletteTyping() {
  const inputEl = document.getElementById('hero-cmd-input');
  if (!inputEl) return;

  const prompts = [
    "Cari tugas 'Desain Landing Page'...",
    "Buat task baru untuk Deva...",
    "Buka laporan produktivitas...",
    "Kirim undangan kolaborasi ke Sarah...",
    "Tampilkan proyek aktif..."
  ];

  let promptIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPrompt = prompts[promptIdx];
    
    if (isDeleting) {
      inputEl.placeholder = currentPrompt.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 30;
    } else {
      inputEl.placeholder = currentPrompt.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === currentPrompt.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full text
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      promptIdx = (promptIdx + 1) % prompts.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing loop
  setTimeout(type, 1000);
}

// Action bindings for Command Palette Shortcuts in Hero
function initCommandPaletteShortcuts() {
  const shortcutButtons = document.querySelectorAll('.hero-cmd-shortcut');
  
  shortcutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.getAttribute('data-action');
      
      // 1. Scroll smoothly to preview section
      const previewSection = document.getElementById('preview');
      if (previewSection) {
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // 2. Select corresponding tab in the dashboard mockup
      setTimeout(() => {
        const correspondingTab = document.querySelector(`.dashboard-tab-btn[data-view="${targetView}"]`);
        if (correspondingTab) {
          correspondingTab.click();
        }
      }, 500); // Wait for scroll animation to proceed
    });
  });
}

// Dashboard subviews (Tasks, Projects, Team, Reports, Timeline) HTML content
const dashboardViews = {
  tasks: `
    <div class="dashboard-view-fade space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
          <i data-lucide="check-square" class="w-4 h-4 text-indigo-400"></i> Task Board
        </h3>
        <button class="px-3 py-1 bg-white hover:bg-slate-200 text-2xs text-black rounded font-bold transition flex items-center gap-1">
          <i data-lucide="plus" class="w-3 h-3"></i> Task Baru
        </button>
      </div>

      <!-- Task Columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- To Do Column -->
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5 space-y-3">
          <div class="flex justify-between items-center px-1 mb-2">
            <span class="text-3xs font-semibold text-zinc-400 uppercase tracking-wider">Antrian (2)</span>
            <span class="w-4 h-4 flex items-center justify-center bg-zinc-900 rounded-full text-[10px] text-zinc-400">2</span>
          </div>
          
          <!-- Card 1 -->
          <div class="p-3 bg-neutral-900/40 hover:bg-neutral-900/80 rounded border border-white/5 space-y-2 cursor-pointer transition">
            <div class="flex justify-between items-start">
              <span class="px-1.5 py-0.5 text-3xs font-medium rounded bg-indigo-500/10 text-indigo-400">Riset Pasar</span>
              <span class="text-3xs text-zinc-500">P2</span>
            </div>
            <h4 class="text-xs font-semibold text-white">Analisis kompetitor Workspace alternatif</h4>
            <div class="flex items-center justify-between pt-2 border-t border-white/5">
              <div class="flex -space-x-1">
                <span class="w-4 h-4 rounded-full bg-indigo-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">A</span>
                <span class="w-4 h-4 rounded-full bg-purple-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">D</span>
              </div>
              <span class="text-[10px] text-zinc-500 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3 text-amber-500"></i> Besok</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="p-3 bg-neutral-900/40 hover:bg-neutral-900/80 rounded border border-white/5 space-y-2 cursor-pointer transition">
            <div class="flex justify-between items-start">
              <span class="px-1.5 py-0.5 text-3xs font-medium rounded bg-purple-500/10 text-purple-400">Desain UI</span>
              <span class="text-3xs text-zinc-500">P1</span>
            </div>
            <h4 class="text-xs font-semibold text-white">Buat wireframe untuk modul Timeline</h4>
            <div class="flex items-center justify-between pt-2 border-t border-white/5">
              <div class="flex -space-x-1">
                <span class="w-4 h-4 rounded-full bg-emerald-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">M</span>
              </div>
              <span class="text-[10px] text-zinc-500 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> 3 Hari</span>
            </div>
          </div>
        </div>

        <!-- In Progress Column -->
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5 space-y-3">
          <div class="flex justify-between items-center px-1 mb-2">
            <span class="text-3xs font-semibold text-indigo-400 uppercase tracking-wider">Sedang Dikerjakan</span>
            <span class="w-4 h-4 flex items-center justify-center bg-indigo-950/50 rounded-full text-[10px] text-indigo-400">1</span>
          </div>

          <!-- Card 3 -->
          <div class="p-3 bg-neutral-900/40 hover:bg-neutral-900/80 rounded border border-white/5 space-y-2 cursor-pointer transition">
            <div class="flex justify-between items-start">
              <span class="px-1.5 py-0.5 text-3xs font-medium rounded bg-indigo-500/10 text-indigo-400">Frontend</span>
              <span class="text-3xs text-amber-500 font-bold">P1</span>
            </div>
            <h4 class="text-xs font-semibold text-white">Integrasi Dashboard Analytics Chart</h4>
            <div class="w-full bg-zinc-800 h-1 rounded-full overflow-hidden mt-1">
              <div class="bg-indigo-500 h-full rounded-full" style="width: 65%"></div>
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-white/5">
              <div class="flex -space-x-1">
                <span class="w-4 h-4 rounded-full bg-purple-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">D</span>
                <span class="w-4 h-4 rounded-full bg-cyan-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">S</span>
              </div>
              <span class="text-[10px] text-indigo-400 font-semibold">65% selesai</span>
            </div>
          </div>
        </div>

        <!-- Done Column -->
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5 space-y-3">
          <div class="flex justify-between items-center px-1 mb-2">
            <span class="text-3xs font-semibold text-emerald-400 uppercase tracking-wider">Selesai</span>
            <span class="w-4 h-4 flex items-center justify-center bg-emerald-950/50 rounded-full text-[10px] text-emerald-400">2</span>
          </div>

          <!-- Card 4 -->
          <div class="p-3 bg-neutral-900/40 hover:bg-neutral-900/80 rounded border border-white/5 space-y-2 cursor-pointer transition">
            <div class="flex justify-between items-start">
              <span class="px-1.5 py-0.5 text-3xs font-medium rounded bg-emerald-500/10 text-emerald-400">Database</span>
              <span class="text-3xs text-emerald-500"><i data-lucide="check-circle" class="w-2.5 h-2.5 inline"></i></span>
            </div>
            <h4 class="text-xs font-semibold text-zinc-500 line-through">Struktur Database Skema V1.0</h4>
            <div class="flex items-center justify-between pt-2 border-t border-white/5">
              <div class="flex -space-x-1">
                <span class="w-4 h-4 rounded-full bg-emerald-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">M</span>
              </div>
              <span class="text-[10px] text-emerald-400 font-semibold">Kemarin</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="p-3 bg-neutral-900/40 hover:bg-neutral-900/80 rounded border border-white/5 space-y-2 cursor-pointer transition">
            <div class="flex justify-between items-start">
              <span class="px-1.5 py-0.5 text-3xs font-medium rounded bg-indigo-500/10 text-indigo-400">Marketing</span>
              <span class="text-3xs text-emerald-500"><i data-lucide="check-circle" class="w-2.5 h-2.5 inline"></i></span>
            </div>
            <h4 class="text-xs font-semibold text-zinc-500 line-through">Membuat materi siaran pers Nexora</h4>
            <div class="flex items-center justify-between pt-2 border-t border-white/5">
              <div class="flex -space-x-1">
                <span class="w-4 h-4 rounded-full bg-indigo-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">A</span>
              </div>
              <span class="text-[10px] text-emerald-400 font-semibold">Hari ini</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  project: `
    <div class="dashboard-view-fade space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
          <i data-lucide="pie-chart" class="w-4 h-4 text-indigo-400"></i> Project Tracker
        </h3>
        <span class="text-2xs text-zinc-400">Total Proyek: 4 Proyek Aktif</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Project 1 -->
        <div class="p-4 bg-neutral-950/60 rounded-lg border border-white/5 space-y-4">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-sm font-bold text-white">Nexora Web App Design</h4>
              <p class="text-3xs text-zinc-400">Kategori: Product Development</p>
            </div>
            <span class="px-1.5 py-0.5 text-3xs font-semibold rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">On Track</span>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-3xs">
              <span class="text-zinc-500">Progres Kerja</span>
              <span class="text-white font-semibold">82%</span>
            </div>
            <div class="w-full bg-zinc-850 h-1.5 rounded-full overflow-hidden">
              <div class="bg-indigo-500 h-full rounded-full" style="width: 82%"></div>
            </div>
          </div>

          <div class="flex justify-between items-center text-2xs text-zinc-500 pt-2 border-t border-white/5">
            <span class="flex items-center gap-1"><i data-lucide="check-square" class="w-3 h-3"></i> 14/17 Task Selesai</span>
            <div class="flex -space-x-1">
              <span class="w-4.5 h-4.5 rounded-full bg-indigo-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">D</span>
              <span class="w-4.5 h-4.5 rounded-full bg-purple-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">S</span>
              <span class="w-4.5 h-4.5 rounded-full bg-emerald-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">M</span>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="p-4 bg-neutral-950/60 rounded-lg border border-white/5 space-y-4">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-sm font-bold text-white">Digital Marketing Campaign</h4>
              <p class="text-3xs text-zinc-400">Kategori: Growth & Acquisition</p>
            </div>
            <span class="px-1.5 py-0.5 text-3xs font-semibold rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">On Track</span>
          </div>

          <div class="space-y-1">
            <div class="flex justify-between text-3xs">
              <span class="text-zinc-500">Progres Kerja</span>
              <span class="text-white font-semibold">45%</span>
            </div>
            <div class="w-full bg-zinc-850 h-1.5 rounded-full overflow-hidden">
              <div class="bg-emerald-500 h-full rounded-full" style="width: 45%"></div>
            </div>
          </div>

          <div class="flex justify-between items-center text-2xs text-zinc-500 pt-2 border-t border-white/5">
            <span class="flex items-center gap-1"><i data-lucide="check-square" class="w-3 h-3"></i> 5/11 Task Selesai</span>
            <div class="flex -space-x-1">
              <span class="w-4.5 h-4.5 rounded-full bg-zinc-700 border border-black text-[9px] flex items-center justify-center font-bold text-white">A</span>
              <span class="w-4.5 h-4.5 rounded-full bg-indigo-600 border border-black text-[9px] flex items-center justify-center font-bold text-white">D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  team: `
    <div class="dashboard-view-fade space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
          <i data-lucide="users" class="w-4 h-4 text-indigo-400"></i> Collaboration
        </h3>
        <button class="px-3 py-1 bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-2xs text-white rounded font-bold transition flex items-center gap-1">
          <i data-lucide="user-plus" class="w-3.5 h-3.5"></i> Undang Tim
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Member 1 -->
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-2xs">DN</div>
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full"></span>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-white">Deva Narendra</h4>
              <p class="text-[10px] text-zinc-400">Product Manager</p>
            </div>
          </div>
          <span class="px-1.5 py-0.5 rounded text-[9px] bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">Online</span>
        </div>

        <!-- Member 2 -->
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-white text-2xs">SL</div>
              <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full"></span>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-white">Sarah Lestari</h4>
              <p class="text-[10px] text-zinc-400">UI/UX Designer</p>
            </div>
          </div>
          <span class="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">Online</span>
        </div>
      </div>
    </div>
  `,
  reports: `
    <div class="dashboard-view-fade space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
          <i data-lucide="trending-up" class="w-4 h-4 text-indigo-400"></i> Reports & Analytics
        </h3>
        <span class="text-[10px] text-zinc-500 bg-zinc-900 border border-white/5 px-2 py-0.5 rounded">Diperbarui baru saja</span>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5">
          <span class="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Task Selesai</span>
          <p class="text-base font-extrabold text-white mt-1">42 <span class="text-[10px] font-normal text-emerald-450">+12%</span></p>
        </div>
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5">
          <span class="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Jam Kerja</span>
          <p class="text-base font-extrabold text-white mt-1">160h <span class="text-[10px] font-normal text-zinc-650">Normal</span></p>
        </div>
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5">
          <span class="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Efisiensi</span>
          <p class="text-base font-extrabold text-white mt-1">94% <span class="text-[10px] font-normal text-emerald-450">+4%</span></p>
        </div>
        <div class="p-3 bg-neutral-950/60 rounded-lg border border-white/5">
          <span class="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Tingkat Error</span>
          <p class="text-base font-extrabold text-white mt-1">0.2% <span class="text-[10px] font-normal text-emerald-450">-0.5%</span></p>
        </div>
      </div>

      <!-- Mini Chart -->
      <div class="p-4 bg-neutral-950/60 rounded-lg border border-white/5">
        <div class="h-20 w-full flex items-end justify-between gap-2 pt-2">
          <div class="w-full bg-zinc-900 rounded-t h-[40%] flex items-end justify-center"><div class="w-full bg-indigo-500 h-[60%] rounded-t"></div></div>
          <div class="w-full bg-zinc-900 rounded-t h-[55%] flex items-end justify-center"><div class="w-full bg-indigo-500 h-[80%] rounded-t"></div></div>
          <div class="w-full bg-zinc-900 rounded-t h-[75%] flex items-end justify-center"><div class="w-full bg-indigo-500 h-[90%] rounded-t"></div></div>
          <div class="w-full bg-zinc-900 rounded-t h-[60%] flex items-end justify-center"><div class="w-full bg-indigo-500 h-[70%] rounded-t"></div></div>
          <div class="w-full bg-zinc-900 rounded-t h-[90%] flex items-end justify-center"><div class="w-full bg-indigo-500 h-[95%] rounded-t"></div></div>
        </div>
      </div>
    </div>
  `,
  timeline: `
    <div class="dashboard-view-fade space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold text-white flex items-center gap-2 tracking-tight">
          <i data-lucide="history" class="w-4 h-4 text-indigo-400"></i> Activity Timeline
        </h3>
      </div>

      <div class="relative pl-4 border-l border-zinc-800 space-y-4 ml-1">
        <div class="relative">
          <span class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center"></span>
          <div class="space-y-0.5">
            <span class="text-xs font-semibold text-white">Sarah Lestari menyelesaikan task</span>
            <p class="text-3xs text-zinc-400">"Revisi Wireframe Landing Page - Mobile Layout" • 5 menit lalu</p>
          </div>
        </div>

        <div class="relative">
          <span class="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-black flex items-center justify-center"></span>
          <div class="space-y-0.5">
            <span class="text-xs font-semibold text-white">Deva Narendra memperbarui Proyek</span>
            <p class="text-3xs text-zinc-400">Mengubah deadline "Nexora Web App Design" • 42 menit lalu</p>
          </div>
        </div>
      </div>
    </div>
  `
};

function initDashboardPreview() {
  const container = document.getElementById('dashboard-content-area');
  const tabs = document.querySelectorAll('.dashboard-tab-btn');

  if (!container) return;

  // Render initial tasks view
  container.innerHTML = dashboardViews.tasks;
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Handle Tab Clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const viewKey = tab.getAttribute('data-view');
      
      if (dashboardViews[viewKey]) {
        // Toggle Active Classes on Sidebar tabs
        tabs.forEach(t => {
          t.classList.remove('active-vercel-tab');
          t.classList.add('text-zinc-400', 'hover:bg-white/5', 'hover:text-white');
        });
        tab.classList.add('active-vercel-tab');
        tab.classList.remove('text-zinc-400', 'hover:bg-white/5', 'hover:text-white');

        // Inject new content
        container.innerHTML = dashboardViews[viewKey];

        // Re-initialize Lucide Icons for injected components
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  });
}
