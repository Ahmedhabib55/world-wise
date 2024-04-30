import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchparams] = useSearchParams();
  const lng = searchparams.get("lng");
  const lat = searchparams.get("lat");

  return { lng, lat };
}
