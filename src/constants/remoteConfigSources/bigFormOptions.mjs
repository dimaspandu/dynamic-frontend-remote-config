/**
 * Large dataset separated for modularity and to reduce bundle size.
 * These options are typically used for forms with large select dropdowns.
 * Keeping them here avoids bloating the main remoteConfigSources file.
 */

export const bigFormOptions = {
  // List of product categories commonly used in e-commerce
  productCategories: [
    { id: "electronics", label: "Electronics" },
    { id: "fashion", label: "Fashion & Apparel" },
    { id: "home_garden", label: "Home & Garden" },
    { id: "sports", label: "Sports & Outdoors" },
    { id: "beauty", label: "Beauty & Personal Care" },
    { id: "toys", label: "Toys & Games" },
    { id: "books", label: "Books & Stationery" },
    { id: "automotive", label: "Automotive" },
    { id: "groceries", label: "Groceries" },
    { id: "health", label: "Health & Wellness" },
    { id: "music", label: "Music & Instruments" },
    { id: "pet_supplies", label: "Pet Supplies" },
    { id: "office", label: "Office & Productivity" },
  ],

  // Common industries, often used for B2B profiling
  industries: [
    { id: "it", label: "Information Technology" },
    { id: "finance", label: "Finance & Banking" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "manufacturing", label: "Manufacturing" },
    { id: "agriculture", label: "Agriculture" },
    { id: "retail", label: "Retail" },
    { id: "transport", label: "Transportation & Logistics" },
    { id: "energy", label: "Energy & Utilities" },
    { id: "construction", label: "Construction" },
    { id: "government", label: "Government" },
    { id: "media", label: "Media & Entertainment" },
  ],

  // Country list with ISO codes (sample subset, extendable)
  countries: [
    { code: "US", name: "United States" },
    { code: "ID", name: "Indonesia" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "GB", name: "United Kingdom" },
    { code: "BR", name: "Brazil" },
    { code: "ZA", name: "South Africa" },
    { code: "AU", name: "Australia" },
    { code: "CA", name: "Canada" },
    { code: "MX", name: "Mexico" },
    { code: "RU", name: "Russia" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "NG", name: "Nigeria" },
    // ... more countries could be added
  ],

  // Currency list
  currencies: [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "ZAR", name: "South African Rand" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "KRW", name: "South Korean Won" },
    { code: "SAR", name: "Saudi Riyal" },
  ],

  // Supported languages (sample)
  languages: [
    { code: "en", label: "English" },
    { code: "id", label: "Bahasa Indonesia" },
    { code: "ja", label: "Japanese" },
    { code: "zh", label: "Chinese" },
    { code: "hi", label: "Hindi" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "ar", label: "Arabic" },
    { code: "pt", label: "Portuguese" },
    { code: "ru", label: "Russian" },
    { code: "ko", label: "Korean" },
  ],
};
