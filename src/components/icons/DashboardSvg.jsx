import React from "react";

const DashboardSvg = ({ className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.3em"
        height="1.3em"
        viewBox="0 0 24 24"
        className={className}
      >
        <path
          fill="currentColor"
          d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715c.519.948.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725z"
          opacity={0.5}
        ></path>
        <path
          fill="currentColor"
          d="M12.75 11a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V17a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
        ></path>
      </svg>
    </>
  );
};

export default DashboardSvg;
