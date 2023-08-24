export async function fetchShipments() {
    const response = await fetch(
      "https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch shipments data");
    }
    const data = await response.json();
    return data;
  }