import wixWindow from "wix-window";
import { SITE_CONFIG } from "public/config";

$w.onReady(function () {
  if ($w("#footerYear")) {
    $w("#footerYear").text = String(new Date().getFullYear());
  }

  if ($w("#footerEmail")) {
    $w("#footerEmail").text = SITE_CONFIG.company.email;
  }
});
