const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between py-2">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm text-gray-900 font-medium text-right">{value}</span>
    </div>
);

export default InfoRow