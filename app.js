/* Lumin Docs — interactivity (K12Online) */

// ─── Theme toggle ───
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('lumin-theme');
if (saved) html.setAttribute('data-theme', saved);
themeBtn.textContent = html.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('lumin-theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ─── Mobile sidebar ───
const sidebar = document.getElementById('sidebar');
document.getElementById('menuToggle').addEventListener('click', () => sidebar.classList.toggle('open'));
sidebar.addEventListener('click', e => { if (e.target.closest('.nav-link')) sidebar.classList.remove('open'); });

// ─── Scroll spy + smooth scroll ───
const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
links.forEach(l => l.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(l.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
}));
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${en.target.id}"]`)?.classList.add('active');
    }
  });
}, { rootMargin: '-15% 0px -75% 0px' });
sections.forEach(s => spy.observe(s));

// ─── Color swatch rows ───
const steps12 = ['25','50','100','200','300','400','500','600','700','800','900','950'];
for (const [id, name] of [['sw-blue','blue'],['sw-orange','orange'],['sw-gray','gray']]) {
  const el = document.getElementById(id);
  if (!el) continue;
  el.innerHTML = steps12.map(s => {
    const darkText = ['25','50','100','200','300'].includes(s);
    return `<div class="swatch" style="background:var(--c-${name}-${s});color:${darkText ? '#475467' : '#fff'}">${s}</div>`;
  }).join('');
}

// ─── Table body ───
const tbody = document.getElementById('tbl-body');
if (tbody) {
  const names = ['Nguyễn Thị Hồng Thắm','Nguyễn Thị Hồng Thắm','Lê Thị Mai','Lê Thị Mai','Lê Thị Mai','Trần Văn Nam','Phạm Hoàng An','Vũ Thị Lan','Đỗ Minh Quân','Lê Thị Mai'];
  const colors = [['#C2DDF5','#005CB6'],['#FCD7C4','#B03D10'],['#D1FADF','#027A48'],['#FEF0C7','#B54708'],['#E9D7FE','#6941C6']];
  tbody.innerHTML = names.map((n, i) => {
    const sel = i < 3;
    const active = i < 5;
    const c = colors[i % colors.length];
    const initials = n.split(' ').slice(-2).map(w => w[0]).join('');
    return `<tr class="${sel ? 'selected' : ''}">
      <td><label class="check"><input type="checkbox" ${sel ? 'checked' : ''}><span class="box">${sel ? '<svg viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2"><path d="M2.5 6l2.5 2.5 4.5-5"/></svg>' : ''}</span></label></td>
      <td>${i + 1}</td>
      <td><div class="u"><span class="avatar" style="background:${c[0]};color:${c[1]}">${initials}</span> ${n}</div></td>
      <td>${active ? '<span class="status active"><span class="dot"></span> Đang hoạt động</span>' : '<span class="status inactive"><span class="dot"></span> Ngừng hoạt động</span>'}</td>
      <td>001301028885</td><td>18.005679</td><td>Đảng bộ Văn phòng Tỉnh</td>
      <td><div class="row-actions">
        <span class="act" title="Xem">👁</span><span class="act" title="Sửa">✏</span>
        <span class="act" title="Khóa">🔒</span><span class="act danger" title="Xóa">🗑</span>
      </div></td>
    </tr>`;
  }).join('');
  // row checkbox toggle
  tbody.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      const tr = e.target.closest('tr');
      tr.classList.toggle('selected', e.target.checked);
      const box = e.target.nextElementSibling;
      box.innerHTML = e.target.checked ? '<svg viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2"><path d="M2.5 6l2.5 2.5 4.5-5"/></svg>' : '';
    }
  });
}

// ─── Calendar render ───
const cal = document.getElementById('calendar');
if (cal) {
  const dows = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  // October 2023, starts on Sunday(0). 31 days. 1st Oct 2023 = Sunday.
  const firstDow = 0, daysInMonth = 31, today = 25, selected = 25;
  let cells = '';
  for (let i = 0; i < firstDow; i++) cells += `<div class="day muted"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    let cls = 'day';
    if (d === selected) cls += ' selected';
    else if (d >= 23 && d <= 27) cls += ' in-range';
    cells += `<button class="${cls}">${d}</button>`;
  }
  cal.innerHTML = `
    <div class="cal-head"><button class="cal-nav">‹</button><span class="m">Tháng 10, 2023</span><button class="cal-nav">›</button></div>
    <div class="cal-grid">${dows.map(d => `<div class="dow">${d}</div>`).join('')}${cells}</div>
    <div class="cal-foot"><button class="btn btn--tertiary btn--sm">Hôm nay</button><button class="btn btn--primary btn--sm">Chọn</button></div>`;
  cal.querySelector('.cal-grid').addEventListener('click', e => {
    if (e.target.classList.contains('day') && e.target.textContent) {
      cal.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
      e.target.classList.add('selected');
    }
  });
}

// ─── Treeview render ───
const tree = document.getElementById('tree');
if (tree) {
  const data = [
    { name: 'Năm học 2025-2026', open: true, children: [
      { name: 'Khối 10', open: true, children: [
        { name: 'Lớp 10A1', children: [{ file: 'Danh sách HS.xlsx' }, { file: 'Bảng điểm.pdf' }] },
        { name: 'Lớp 10A2', children: [{ file: 'Danh sách HS.xlsx' }] },
      ]},
      { name: 'Khối 11', children: [] },
      { name: 'Khối 12', children: [] },
    ]},
  ];
  const render = (nodes) => nodes.map(n => {
    if (n.file) return `<div class="tree-item"><span class="tree-caret leaf">▶</span><span class="tree-icon file">📄</span> ${n.file}</div>`;
    const hasKids = n.children && n.children.length;
    const open = n.open && hasKids;
    return `<div class="tree-node">
      <div class="tree-item" data-toggle><span class="tree-caret ${open ? 'open' : ''} ${hasKids ? '' : 'leaf'}">▶</span><span class="tree-icon">📁</span> ${n.name}</div>
      ${hasKids ? `<div class="tree-children" ${open ? '' : 'hidden'}>${render(n.children)}</div>` : ''}
    </div>`;
  }).join('');
  tree.innerHTML = render(data);
  tree.addEventListener('click', e => {
    const item = e.target.closest('[data-toggle]');
    if (!item) return;
    const kids = item.nextElementSibling;
    const caret = item.querySelector('.tree-caret');
    if (kids && kids.classList.contains('tree-children')) {
      kids.hidden = !kids.hidden;
      caret.classList.toggle('open', !kids.hidden);
    }
  });
}

// ─── Select dropdown toggle ───
document.querySelectorAll('[data-select]').forEach(trigger => {
  const menu = trigger.parentElement.querySelector('.select-menu');
  trigger.addEventListener('click', () => {
    trigger.classList.toggle('open');
    if (menu) menu.hidden = !menu.hidden;
  });
  if (menu) menu.addEventListener('click', e => {
    const opt = e.target.closest('.select-opt');
    if (!opt) return;
    menu.querySelectorAll('.select-opt').forEach(o => { o.classList.remove('selected'); o.querySelector('.check')?.remove(); });
    opt.classList.add('selected');
    opt.insertAdjacentHTML('beforeend', '<span class="check">✓</span>');
    trigger.querySelector('.ph,.select-chips').textContent = opt.childNodes[0].textContent.trim();
    trigger.querySelector('.ph')?.classList.remove('ph');
    trigger.classList.remove('open');
    menu.hidden = true;
  });
});
document.addEventListener('click', e => {
  if (!e.target.closest('.select')) {
    document.querySelectorAll('.select-trigger.open').forEach(t => {
      t.classList.remove('open');
      const m = t.parentElement.querySelector('.select-menu');
      if (m) m.hidden = true;
    });
  }
});

// ─── Tabs (demo) ───
document.querySelectorAll('.tabs').forEach(group => {
  group.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ─── Segmented (demo) ───
document.querySelectorAll('.segmented').forEach(group => {
  group.addEventListener('click', e => {
    const seg = e.target.closest('.seg');
    if (!seg) return;
    group.querySelectorAll('.seg').forEach(s => s.classList.remove('active'));
    seg.classList.add('active');
  });
});

// ─── Toast dismiss (demo) ───
document.querySelectorAll('.toast .t-close').forEach(x => {
  x.addEventListener('click', () => { x.closest('.toast').style.opacity = '0'; });
});
