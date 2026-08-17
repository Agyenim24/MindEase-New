import json
import urllib.request
import urllib.error

SUPABASE_URL = "https://xkakuhjwqrzkgkiremzt.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYWt1aGp3cXJ6a2draXJlbXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODk3NTIsImV4cCI6MjEwMTc2NTc1Mn0.33Iu2CMqLpodbwzRNHsYHyfl7xWC0EaR86pWRlFi6qU"


def get_headers():
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }


def supabase_insert(table_name: str, data: dict):
    """Insert or upsert a record into Supabase PostgreSQL table via REST API."""
    url = f"{SUPABASE_URL}/rest/v1/{table_name}"
    headers = get_headers()
    headers["Prefer"] = "resolution=merge-duplicates,return=representation"

    req_data = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=req_data, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            return json.loads(res_body) if res_body else {}
    except Exception as e:
        print(f"Supabase sync failed for table {table_name}: {e}")
        return None


def supabase_update(table_name: str, query_params: dict, data: dict):
    """Update records in Supabase PostgreSQL table via REST API."""
    query_str = "&".join(f"{k}={v}" for k, v in query_params.items())
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?{query_str}"
    headers = get_headers()
    headers["Prefer"] = "return=representation"

    req_data = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=req_data, headers=headers, method="PATCH")

    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            return json.loads(res_body) if res_body else {}
    except Exception as e:
        print(f"Supabase update failed for table {table_name}: {e}")
        return None


def supabase_delete(table_name: str, query_params: dict):
    """Delete records in Supabase PostgreSQL table via REST API."""
    query_str = "&".join(f"{k}={v}" for k, v in query_params.items())
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?{query_str}"
    headers = get_headers()

    req = urllib.request.Request(url, headers=headers, method="DELETE")

    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            return json.loads(res_body) if res_body else {}
    except Exception as e:
        print(f"Supabase delete failed for table {table_name}: {e}")
        return None


def supabase_sync_user(user_id: str, email: str, name: str, password_hash: str = ""):
    """Sync user directly into Supabase auth.users & public.users via RPC function."""
    url = f"{SUPABASE_URL}/rest/v1/rpc/register_auth_user"
    headers = get_headers()
    payload = {
        "p_id": user_id,
        "p_email": email,
        "p_name": name,
        "p_password_hash": password_hash
    }
    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=req_data, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            return json.loads(res_body) if res_body else {}
    except Exception as e:
        print(f"Supabase auth user RPC sync notice: {e}")
        return None


def supabase_auth_signup(email: str, password: str, name: str = ""):
    """Register a new user in Supabase Auth via GoTrue API."""
    url = f"{SUPABASE_URL}/auth/v1/signup"
    headers = get_headers()
    payload = {
        "email": email,
        "password": password,
        "data": {"name": name}
    }
    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=req_data, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            return True, json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        try:
            err_json = json.loads(error_body)
            msg = err_json.get("msg") or err_json.get("error_description") or "Supabase signup error"
        except Exception:
            msg = f"HTTP Error {e.code}"
        return False, {"error": msg}
    except Exception as e:
        return False, {"error": str(e)}


def supabase_auth_login(email: str, password: str):
    """Authenticate user with Supabase Auth via GoTrue API."""
    url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = get_headers()
    payload = {
        "email": email,
        "password": password
    }
    req_data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=req_data, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode("utf-8")
            return True, json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        try:
            err_json = json.loads(error_body)
            msg = err_json.get("error_description") or err_json.get("msg") or "Invalid email or password"
        except Exception:
            msg = f"HTTP Error {e.code}"
        return False, {"error": msg}
    except Exception as e:
        return False, {"error": str(e)}
