document.addEventListener("DOMContentLoaded", function() {
  // 1. Checkboxen anklickbar machen
  const checkboxes = document.querySelectorAll('.task-list-item input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    checkbox.removeAttribute('disabled');
  });

  // 2. Button zum Zurücksetzen dynamisch oben vor die Checkliste einfügen
  if (checkboxes.length > 0) {
    const resetButton = document.createElement('button');
    resetButton.innerText = '🔄 Checkliste zurücksetzen';
    
    // Dezentes Styling für den Button (passt zum Material-Theme)
    resetButton.style.marginBottom = '1em';
    resetButton.style.padding = '8px 16px';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '4px';
    resetButton.style.backgroundColor = 'var(--md-primary-fallback-color, #e53935)';
    resetButton.style.color = '#ffffff';
    resetButton.style.fontWeight = 'bold';
    resetButton.style.cursor = 'pointer';

    // Hover-Effekt
    resetButton.onmouseover = function() { resetButton.style.opacity = '0.9'; };
    resetButton.onmouseout = function() { resetButton.style.opacity = '1.0'; };

    // Klick-Logik: Alle Haken entfernen
    resetButton.addEventListener('click', function() {
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });
    });

    // Button vor dem ersten Absatz/Inhalt der Seite platzieren
    const contentContainer = document.querySelector('.md-content__inner');
    if (contentContainer) {
      const firstHeading = contentContainer.querySelector('h1') || contentContainer.firstChild;
      firstHeading.parentNode.insertBefore(resetButton, firstHeading.nextSibling);
    }
  }
});