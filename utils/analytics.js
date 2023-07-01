import Analytics from "analytics";
import googleTagManager from "@analytics/google-tag-manager";

const GTM_CONTAINER_ID = "GTM-52VFSVM";

const analytics = Analytics({
  app: "inkart", // Call this whatever you like.
  plugins: [
    googleTagManager({
      containerId: GTM_CONTAINER_ID,
      enabled: true,
    }),
  ],
});

export default analytics;


export const GTM_ID = "GTM-52VFSVM";

export const pageview = (url) => {
  window.dataLayer.push({
    event: "pageview",
    page: url,
  });
};
