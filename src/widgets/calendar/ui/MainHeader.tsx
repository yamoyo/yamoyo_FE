import { Link } from 'react-router-dom';

export default function MainHeader() {
  return (
    <header className="grid grid-cols-3 items-center px-6">
      <Link to="/home" className="flex justify-start">
        <img src={'/assets/home/home-logo.png'} width={72} height={36} />
      </Link>

      <div className="flex justify-center">
        <p className="text-body-1">캘린더</p>
      </div>

      <div className="flex justify-end">
        <button>
          <img src={'/assets/icons/team-select.svg'} width={28} height={28} />
        </button>
      </div>
    </header>
  );
}
