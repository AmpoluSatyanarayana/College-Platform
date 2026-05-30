export type CollegeSortOption =
  | ""
  | "rating-desc"
  | "rating-asc"
  | "placement-desc"
  | "placement-asc"
  | "fees-asc"
  | "fees-desc";

type SortableCollege = {
  rating: number;
  placementPercentage: number;
  fees: number;
};

export function sortColleges<T extends SortableCollege>(
  colleges: T[],
  sortBy: CollegeSortOption
): T[] {
  if (!sortBy) return colleges;

  const sorted = [...colleges];

  switch (sortBy) {
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);
    case "placement-desc":
      return sorted.sort(
        (a, b) => b.placementPercentage - a.placementPercentage
      );
    case "placement-asc":
      return sorted.sort(
        (a, b) => a.placementPercentage - b.placementPercentage
      );
    case "fees-asc":
      return sorted.sort((a, b) => a.fees - b.fees);
    case "fees-desc":
      return sorted.sort((a, b) => b.fees - a.fees);
    default:
      return colleges;
  }
}
