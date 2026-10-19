document.addEventListener("DOMContentLoaded", function() {
  const checkboxes = document.querySelectorAll('.task-list-item input[type="checkbox"]');
  
  if (checkboxes.length > 0) {
    // 1. Checkboxen aktivieren
    checkboxes.forEach(function(checkbox) {
      checkbox.removeAttribute('disabled');
    });

    // 2. Container für Fortschritt und Reset-Button erstellen
    const progressContainer = document.createElement('div');
    progressContainer.style.marginBottom = '1.5em';
    progressContainer.style.padding = '12px 16px';
    progressContainer.style.borderRadius = '8px';
    progressContainer.style.backgroundColor = 'var(--md-code-bg-color, #f5f5f5)';
    progressContainer.style.border = '1px solid var(--md-typeset-table-color, #e0e0e0)';

    progressContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: bold; font-size: 0.95em;">Fortschritt Erst-Setup:</span>
        <span id="progress-text" style="font-weight: bold; color: var(--md-primary-fg-color, #e53935);">0% (0 / ${checkboxes.length})</span>
      </div>
      <div style="width: 100%; background-color: #ddd; height: 10px; border-radius: 5px; overflow: hidden; margin-bottom: 12px;">
        <div id="progress-bar" style="width: 0%; height: 100%; background-color: #4caf50; transition: width 0.3s ease;"></div>
      </div>
      <button id="reset-checklist-btn" style="padding: 6px 12px; border: none; border-radius: 4px; background-color: #e53935; color: white; font-weight: bold; cursor: pointer; font-size: 0.85em;">
        🔄 Checkliste zurücksetzen
      </button>
    `;

    // Container oben im Dokument einfügen
    const contentContainer = document.querySelector('.md-content__inner');
    if (contentContainer) {
      const firstHeading = contentContainer.querySelector('h1') || contentContainer.firstChild;
      firstHeading.parentNode.insertBefore(progressContainer, firstHeading.nextSibling);
    }

    // 3. Logik zur Berechnung des Fortschritts
    function updateProgress() {
      const checkedCount = document.querySelectorAll('.task-list-item input[type="checkbox"]:checked').length;
      const percentage = Math.round((checkedCount / checkboxes.length) * 100);
      
      const progressBar = document.getElementById('progress-bar');
      const progressText = document.getElementById('progress-text');

      if (progressBar && progressText) {
        progressBar.style.width = percentage + '%';
        progressText.innerText = `${percentage}% (${checkedCount} / ${checkboxes.length})`;
      }
    }

    // Event-Listener für jede Checkbox
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', updateProgress);
    });

    // Reset-Button Logik
    document.getElementById('reset-checklist-btn').addEventListener('click', function() {
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });
      updateProgress();
    });

    // Initialer Aufruf
    updateProgress();
  }
});