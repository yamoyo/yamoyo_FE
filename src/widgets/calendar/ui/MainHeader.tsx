import { Link } from 'react-router-dom';

export default function MainHeader() {
  return (
    <header className="grid grid-cols-3 items-center">
      <Link to="/home" className="flex select-none justify-start pl-6">
        <img
          src={'/assets/home/home-logo.png'}
          width={72}
          height={36}
          draggable="false"
        />
      </Link>

      <div className="flex justify-center">
        <p className="text-body-1 text-white">캘린더</p>
      </div>

      <div className="flex select-none justify-end pr-8">
        <button>
          <img
            src={'/assets/icons/team-select.svg'}
            width={28}
            height={28}
            draggable="false"
          />
        </button>
      </div>
    </header>
  );
}
