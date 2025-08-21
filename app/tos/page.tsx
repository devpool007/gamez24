export default function TermsOfService({
brandName = "Gamez24",
country = "Germany",
lastUpdated = "21 Aug 2025",
}: {
brandName?: string;
country?: string;
lastUpdated?: string;
}) {
return (
<article className="prose prose-gray max-w-none">
<h2 className="!mt-0 text-4xl font-bold font-modern">Terms of Service</h2>
<p className="text-sm text-gray-500 mt-5">Last updated: {lastUpdated}</p>


<p>
Welcome to {brandName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By using this website (the &quot;Site&quot;), you
agree to these Terms of Service. If you do not agree, please do not use the Site.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">1. Purpose of the Site</h3>
<p>
The Site provides information about video game deals from third-party platforms such as
Steam, Epic Games, and GOG.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">2. No Affiliation</h3>
<p>
We are <strong>not affiliated</strong> with Steam, Epic Games, GOG, or any other third-party
store. All trademarks and logos belong to their respective owners.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">3. No Warranties</h3>
<p>
The Site and its content are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We do not
guarantee the accuracy, availability, or timeliness of deals displayed. Prices and offers may
change at any time on third-party platforms. Users should verify details on the official
store before making a purchase.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">4. Limitation of Liability</h3>
<p>
To the maximum extent permitted by law, we are not responsible for any loss, damage, or
issues arising from the use of the Site, including but not limited to inaccurate deal
listings, expired offers, or third-party content.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">5. External Links</h3>
<p>
The Site contains links to external websites. We are not responsible for the content,
policies, or practices of those external sites. Your interactions with third-party platforms
are subject to their own terms and policies.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">6. Future Features</h3>
<p>
If we introduce features such as user accounts, personalized services, or newsletters,
additional terms may apply and this page will be updated.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">7. Governing Law</h3>
<p>These Terms are governed by the laws of {country}, without regard to conflict of law principles.</p>


<h3 className="text-2xl font-bold font-modern mt-5">8. Intellectual Property</h3>
<p>
All content on the Site is protected by copyright. You may not copy, reproduce, or
distribute the content without prior written permission from us, except for personal,
non-commercial use.
</p>


<h3 className="text-2xl font-bold font-modern mt-5">9. Changes to Terms</h3>
<p>
We may update these Terms from time to time. Continued use of the Site after changes means
you accept the updated Terms.
</p>


{/* <hr /> */}
{/* <p className="text-xs text-gray-500">
Tip: When you add accounts, payments, or user-generated content later, add sections for
acceptable use, account termination, refunds, and DMCA/notice-and-takedown.
</p> */}
</article>
);
}