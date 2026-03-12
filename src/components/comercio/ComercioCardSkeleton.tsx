import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ComercioCardSkeletonProps = {
  className?: string;
};

const ComercioCardSkeleton = ({ className }: ComercioCardSkeletonProps) => {
  const wrapperClassName = ['redirect', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName} aria-hidden="true">
      <div className="card-image-section">
        <Skeleton height="100%" />
      </div>
      <div className="card-info-section">
        <div className="card-header">
          <Skeleton circle width={50} height={50} />
          <div className="card-text">
            <div className="card-title-line">
              <Skeleton width="60%" height={14} />
              <Skeleton width={42} height={14} />
            </div>
            <div className="card-details-line">
              <Skeleton width="40%" height={12} />
              <Skeleton width={62} height={12} />
              <Skeleton width={44} height={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComercioCardSkeleton;
