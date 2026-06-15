import wixLocation from "wix-location";
import { SITE_CONFIG } from "public/config";

export function btnBuyTraining_click() {
  wixLocation.to(SITE_CONFIG.stripe.training);
}

export function btnBuyAutomation_click() {
  wixLocation.to(SITE_CONFIG.stripe.automation);
}

export function btnBuyIntegration_click() {
  wixLocation.to(SITE_CONFIG.stripe.integration);
}

// Alternative: open in new tab
export function btnBuyTraining_click_newTab() {
  // @ts-ignore
  window.open(SITE_CONFIG.stripe.training, "_blank");
}
