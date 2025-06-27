export async function Log(stack, level, pkg, message) {
  const validStacks = ["frontend", "backend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validFrontendPackages = ["api", "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"];

  // Validate before sending
  if (!validStacks.includes(stack) || !validLevels.includes(level) || !validFrontendPackages.includes(pkg)) {
    console.warn("Invalid log parameters:", { stack, level, pkg, message });
    return;
  }

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    const data = await response.json();
    console.info("Logged successfully:", data.message);
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}
