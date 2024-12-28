const InfoListItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <div className="flex items-start space-x-4">
    <div className="p-2 bg-gray-100 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-700">{label}</h4>
      <div className="mt-1 text-sm text-gray-900">{value}</div>
    </div>
  </div>
);

export default InfoListItem;
