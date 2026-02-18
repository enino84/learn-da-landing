(function () {
  const copyBtn = document.getElementById("copyBtn");
  const pipCmd = document.getElementById("pipCmd");
  const status = document.getElementById("copyStatus");

  if (!copyBtn || !pipCmd) return;

  copyBtn.addEventListener("click", async () => {
    const text = (pipCmd.textContent || "").trim();
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = "Copied to clipboard.";
      setTimeout(() => (status.textContent = ""), 1500);
    } catch (e) {
      status.textContent = "Copy failed. Please select and copy manually.";
      setTimeout(() => (status.textContent = ""), 2500);
    }
  });
})();
