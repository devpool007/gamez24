export default function PrivacyPolicy() {
  const brandName = "Gamez24";
  const contactEmail = "techmuscles55@gmail.com";
  const lastUpdated = "8 Sep 2025";
  return (
    <article className="prose prose-gray max-w-none">
      <h2 className="!mt-0 text-4xl font-bold font-modern">Privacy Policy</h2>
      <p className="text-sm text-gray-500 mt-5">Last updated: {lastUpdated}</p>

       <p>
        We respect your privacy. This website {brandName} showcases video game
        deals from third-party platforms such as Steam, Epic Games, and GOG.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">
        1. Information We Collect
      </h3>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          We do <strong>not</strong> collect personal information such as names,
          email addresses, or payment details.
        </li>
        <li>
          <strong>Country Location:</strong> We automatically detect your approximate country location using your IP address to display relevant game deals and content for your region. This location data is processed during your session only and is not stored on our servers.
        </li>
        <li>
          We may collect <strong>anonymous statistics</strong> about overall
          website usage (e.g., number of visits and the countries visitors come
          from) to improve the Site. These statistics cannot identify individual
          users.
        </li>
      </ul>

      <h3 className="text-2xl font-bold font-modern mt-5">2. Cookies and Tracking</h3>
      <p>
        This Site does <strong>not</strong> use cookies or similar tracking
        technologies for behavioral tracking or user identification. However, our hosting infrastructure (Vercel/Cloudflare) may process your IP address through standard HTTP headers to determine your country location for content localization purposes.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">3. How We Use Your Information</h3>
      <p>
        The country location data we collect is used solely to:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4" >
        <li>Display relevant game deals available in your region</li>
        <li>Show appropriate pricing and availability information</li>
        <li>Provide localized content and user experience</li>
      </ul>
      <p>
        This data is not stored, shared with third parties (except our hosting provider for technical processing), or used for any other purposes.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">4. Third-Party Links</h3>
      <p>
        The Site contains links to third-party websites (e.g., Steam, Epic
        Games, GOG). We are not responsible for the privacy practices or content
        of those external sites. We encourage you to review their respective
        privacy policies.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">
        5. Children&#39;s Privacy
      </h3>
      <p>
        The Site is not directed to children under the age of 13. We do not
        knowingly collect personal information from children.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">
        6. Changes to This Policy
      </h3>
      <p>
        If we add features such as user accounts, personalized recommendations,
        or newsletters in the future, this Privacy Policy will be updated to
        explain how we handle personal information. We will notify users of any
        significant changes to our data practices.
      </p>

      <h3 className="text-2xl font-bold font-modern mt-5">7. Contact</h3>
      <p>
        If you have any questions about this Privacy Policy, you may contact us
        at{" "}
        <a className="underline" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </p>

      {/* <hr /> */}
      {/* <p className="text-xs text-gray-500">
        Tip: If you later introduce analytics, cookies, accounts, or
        newsletters, update this page to describe the data collected, purposes,
        legal basis (for EU users), retention, and your processor list.
      </p> */}
    </article>
  );
}
