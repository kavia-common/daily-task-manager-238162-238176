/**
 * Best-effort API client.
 *
 * This frontend container is designed to run standalone (localStorage), but if
 * an API is present at REACT_APP_API_BASE it will attempt to sync.
 *
 * Expected (common) REST shapes (any of these may work depending on backend):
 * - GET    {base}/todos                -> array
 * - POST   {base}/todos                -> created todo
 * - PATCH  {base}/todos/{id}           -> updated todo
 * - DELETE {base}/todos/{id}           -> empty/ok
 *
 * Alternative fallback:
 * - GET/POST/PATCH/DELETE at {base}/api/todos...
 */

function joinUrl(base, path) {
  const b = String(base || "").replace(/\/+$/, "");
  const p = String(path || "").replace(/^\/+/, "");
  return `${b}/${p}`;
}

async function fetchJson(url, options) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options && options.headers ? options.headers : {})
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status} ${res.statusText}${text ? `: ${text}` : ""}`);
    err.status = res.status;
    throw err;
  }

  // Some DELETE endpoints return empty body
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return null;
}

export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.isConfigured = Boolean(baseUrl);
  }

  async listTodos() {
    return this._tryPaths([
      () => fetchJson(joinUrl(this.baseUrl, "todos"), { method: "GET" }),
      () => fetchJson(joinUrl(this.baseUrl, "api/todos"), { method: "GET" })
    ]);
  }

  async createTodo(payload) {
    return this._tryPaths([
      () => fetchJson(joinUrl(this.baseUrl, "todos"), { method: "POST", body: JSON.stringify(payload) }),
      () => fetchJson(joinUrl(this.baseUrl, "api/todos"), { method: "POST", body: JSON.stringify(payload) })
    ]);
  }

  async updateTodo(id, patch) {
    return this._tryPaths([
      () => fetchJson(joinUrl(this.baseUrl, `todos/${encodeURIComponent(id)}`), { method: "PATCH", body: JSON.stringify(patch) }),
      () => fetchJson(joinUrl(this.baseUrl, `api/todos/${encodeURIComponent(id)}`), { method: "PATCH", body: JSON.stringify(patch) })
    ]);
  }

  async deleteTodo(id) {
    return this._tryPaths([
      () => fetchJson(joinUrl(this.baseUrl, `todos/${encodeURIComponent(id)}`), { method: "DELETE" }),
      () => fetchJson(joinUrl(this.baseUrl, `api/todos/${encodeURIComponent(id)}`), { method: "DELETE" })
    ]);
  }

  async _tryPaths(thunks) {
    let lastErr = null;
    for (const fn of thunks) {
      try {
        return await fn();
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error("Request failed");
  }
}
