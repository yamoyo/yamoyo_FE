import { useNavigate } from 'react-router-dom';

interface Prop {
  label: string;
  value: string;
  editRoute?: string;
}

export default function BasicInfoItem({ label, value, editRoute }: Prop) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <p className="w-[87px] text-body-2 text-tx-default_5">{label}</p>
        <p className="text-body-3 text-tx-default">{value}</p>
      </div>
      {editRoute && (
        <button
          className="h-[26px] w-[41px] rounded-xl bg-tx-default_5 text-body-6 text-tx-default flex-center"
          onClick={() => navigate('/myprofile/edit/' + editRoute)}
        >
          수정
        </button>
      )}
    </div>
  );
}
