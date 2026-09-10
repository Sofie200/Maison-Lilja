import { useEffect, useState } from "react";
import { getShopPolicy } from "../shopify/policy";
import "./Policy.css";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

const SWEDISH_TITLES = {
    privacyPolicy: "Integritetspolicy",
    termsOfService: "Köpvillkor",
    refundPolicy: "Returer & reklamation",
    shippingPolicy: "Fraktpolicy",
};

export default function Policy({ policyType }) {
    const [policy, setPolicy] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        getShopPolicy(policyType)
            .then((data) => { if (!cancelled) setPolicy(data); })
            .catch((err) => { if (!cancelled) setError(err.message); });

        return () => { cancelled = true; };
    }, [policyType]);

    if (error) return <section className="section-center"><ErrorMessage message={error} /></section>;
    if (!policy) return <section className="section-center"><Loader /></section>;

    const title = SWEDISH_TITLES[policyType] ?? policy.title;

    return (
        <section className="section-standard section-policy">
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: policy.body }} />
        </section>
    );
}