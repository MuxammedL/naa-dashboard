const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <li className="flex justify-between">
        <span className="label1 text-sidebar-text-color font-semibold">{label}</span>
        <span className="label1 text-secondary-text-color font-medium">{value}</span>
    </li>
);

export default InfoRow