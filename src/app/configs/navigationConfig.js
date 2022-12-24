import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "example-component",
    title: "Example",
    translate: "EXAMPLE",
    type: "item",
    icon: "heroicons-outline:star",
    url: "example",
  },
  {
    id: "dashboard-component",
    title: "Dashbaord",
    translate: "Dashbaord",
    type: "item",
    icon: "heroicons-outline:chart-pie",
    url: "dashboard",
  },
  {
    id: "payment-component",
    title: "Payment",
    translate: "Payment",
    type: "item",
    icon: "heroicons-outline:cash",
    url: "payment",
  },
  {
    id: "user-component",
    title: "User",
    translate: "User",
    type: "item",
    icon: "heroicons-outline:user-circle",
    url: "user",
  },
  {
    id: "package-component",
    title: "Package",
    translate: "Package",
    type: "item",
    icon: "heroicons-outline:tag",
    url: "package",
  },
  {
    id: "area-component",
    title: "Area",
    translate: "Area",
    type: "item",
    icon: "heroicons-outline:location-marker",
    url: "area",
  },
];

export default navigationConfig;
