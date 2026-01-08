import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import type {
  Partner,
  ApiPartner,
  ApiPartnersResponse,
} from "@/services/partner";
import { partnerService } from "@/services/partner";
import { mockPartners } from "@/data/mockPartners";

type PartnerCategory = "Gold" | "Platinum" | "Silver" | "Bronze" | "Other";

export default function Partner({ eventId }: { eventId: string }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventPartners = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the new API to get partners
        const response: ApiPartnersResponse =
          await partnerService.getPartnersFromApi(
            eventId,
            1, // page
            50, // limit - using higher limit to get all partners for event
            "createdAt",
            "desc"
          );

        // Debug: Log all partners and their types
        console.log("All partners from API:", response.data.data);
        console.log(
          "OTHER_PARTNER partners:",
          response.data.data.filter(
            (p) =>
              p.partnerType === "OTHER_PARTNER" ||
              p.partnerType?.toUpperCase() === "OTHER_PARTNER"
          )
        );

        // Convert API response to the format expected by the UI
        const convertedPartners: Partner[] = response.data.data
          .filter((partner) => partner.isActive) // Only include active partners
          .filter((partner) => partner.eventId.includes(eventId)) // Filter by event ID
          .map((apiPartner: ApiPartner) => {
            // Map partnerType to category
            let category:
              | "Gold"
              | "Platinum"
              | "Silver"
              | "Bronze"
              | "Other"
              | undefined;

            // Normalize partnerType to handle case variations
            const normalizedPartnerType = String(apiPartner.partnerType)
              .toUpperCase()
              .trim();

            switch (normalizedPartnerType) {
              case "GOLD_PARTNER":
                category = "Gold";
                break;
              case "PLATINUM_PARTNER":
                category = "Platinum";
                break;
              case "SILVER_PARTNER":
                category = "Silver";
                break;
              case "BRONZE_PARTNER":
                category = "Bronze";
                break;
              case "OTHER_PARTNER":
              case "OTHER":
                category = "Other";
                break;
              default:
                // Log unexpected partnerType for debugging
                console.warn(
                  `Unknown partnerType: ${apiPartner.partnerType}, normalized: ${normalizedPartnerType}`
                );
                category = undefined;
            }

            return {
              logo: apiPartner.imagePath,
              website: "#", // Default to # since API doesn't provide website
              isActive: apiPartner.isActive,
              category: category,
            };
          });

        // Debug: Log converted partners by category
        console.log("Converted partners:", convertedPartners);
        console.log(
          "Other category partners:",
          convertedPartners.filter((p) => p.category === "Other")
        );

        setPartners(convertedPartners);
      } catch (err) {
        setError("Failed to fetch partners");
        console.error("Error fetching event partners:", err);

        // Fallback to mock data if API fails
        try {
          const eventPartners = mockPartners.filter(
            (partner) => partner.isActive
          );
          setPartners(eventPartners);
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventPartners();
  }, [eventId]);

  // Group partners by category
  const partnersByCategory = useMemo(() => {
    const grouped: Record<PartnerCategory, Partner[]> = {
      Gold: [],
      Platinum: [],
      Silver: [],
      Bronze: [],
      Other: [],
    };

    partners.forEach((partner) => {
      if (partner.category && grouped[partner.category]) {
        grouped[partner.category].push(partner);
      } else if (partner.category === "Other") {
        // Debug: Log if Other category partners are not being grouped
        console.warn("Partner with Other category not grouped:", partner);
      }
    });

    // Debug: Log grouped partners
    console.log("Partners by category:", grouped);
    console.log("Other category count:", grouped.Other.length);

    return grouped;
  }, [partners]);

  const handleImageError = (partnerKey: string) => {
    setImageErrors((prev) => new Set(prev).add(partnerKey));
  };

  const getCategoryColor = (category: PartnerCategory) => {
    switch (category) {
      case "Gold":
        return "from-yellow-400 to-yellow-600";
      case "Platinum":
        return "from-gray-300 to-gray-500";
      case "Silver":
        return "from-gray-200 to-gray-400";
      case "Bronze":
        return "from-amber-600 to-amber-800";
      case "Other":
        return "from-amber-600 to-amber-800";
      default:
        return "from-gray-200 to-gray-400";
    }
  };

  const getCategoryTextColor = (category: PartnerCategory) => {
    switch (category) {
      case "Gold":
        return "text-yellow-600";
      case "Platinum":
        return "text-gray-600";
      case "Silver":
        return "text-gray-500";
      case "Bronze":
        return "text-amber-700";
      case "Other":
        return "text-amber-700";
      default:
        return "text-gray-600";
    }
  };

  const getCategoryLineColor = (category: PartnerCategory) => {
    switch (category) {
      case "Gold":
        return "from-transparent via-yellow-300 to-transparent";
      case "Platinum":
        return "from-transparent via-gray-300 to-transparent";
      case "Silver":
        return "from-transparent via-gray-200 to-transparent";
      case "Bronze":
        return "from-transparent via-amber-400 to-transparent";
      case "Other":
        return "from-transparent via-gray-300 to-transparent";
      default:
        return "from-transparent via-gray-300 to-transparent";
    }
  };

  const getCategoryBorderColor = (category: PartnerCategory) => {
    switch (category) {
      case "Gold":
        return "border-yellow-400";
      case "Platinum":
        return "border-gray-400";
      case "Silver":
        return "border-gray-300";
      case "Bronze":
        return "border-amber-600";
      case "Other":
        return "border-blue-300";
      default:
        return "border-red-300";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2b8ffb] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading partners...</p>
      </div>
    );
  }

  if (error || partners.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No partners found for this event.
        </p>
      </div>
    );
  }

  const categoryOrder: PartnerCategory[] = [
    "Gold",
    "Platinum",
    "Silver",
    "Bronze",
    "Other",
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h3>
        <p className="text-gray-600 text-lg">Trusted by industry leaders</p>
      </div>

      {categoryOrder.map((category) => {
        const categoryPartners = partnersByCategory[category];
        if (categoryPartners.length === 0) return null;

        return (
          <div key={category} className="mb-16">
            {/* Category Header */}
            <div className="relative mb-12">
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`h-px flex-1 bg-gradient-to-r ${getCategoryLineColor(
                    category
                  )} opacity-40`}
                ></div>
                <div className="flex items-center gap-4 px-6">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(
                      category
                    )} shadow-md`}
                  ></div>
                  <h4
                    className={`text-3xl md:text-4xl font-bold ${getCategoryTextColor(
                      category
                    )} tracking-wide`}
                  >
                    {category} Partners
                  </h4>
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(
                      category
                    )} shadow-md`}
                  ></div>
                </div>
                <div
                  className={`h-px flex-1 bg-gradient-to-l ${getCategoryLineColor(
                    category
                  )} opacity-40`}
                ></div>
              </div>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {categoryPartners.map((partner, index) => {
                const partnerKey = `${category}-${index}-${
                  partner.website || "#"
                }`;
                return (
                  <div
                    key={partnerKey}
                    className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border-2 ${getCategoryBorderColor(
                      category
                    )} hover:border-[#2b8ffb]/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}
                  >
                    {/* Decorative background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2b8ffb]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Badge */}
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(
                        category
                      )} text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    >
                      {category}
                    </div>

                    {/* Partner logo container */}
                    <Link
                      href={partner.website || "#"}
                      className="relative block text-center group-hover:scale-110 transition-transform duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative h-20 w-full flex items-center justify-center">
                        {!imageErrors.has(partnerKey) && partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt="Partner Logo"
                            width={120}
                            height={80}
                            className="max-h-20 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
                            onError={() => handleImageError(partnerKey)}
                            unoptimized={true}
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-bold text-lg">
                              P
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Hover indicator */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#2b8ffb] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                        <div className="w-full h-full bg-white rounded-full scale-50"></div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
