import { Star } from 'lucide-react';

export const StarRating = ({ rating }) => {
  // Ensure rating is between 0 and 10
  const clampedRating = Math.max(0, Math.min(10, rating));

  return (
      <div className="d-flex align-items-center">
        {[...Array(10)].map((_, index) => {
          const starNumber = index + 1;
          const fillPercentage = Math.max(0, Math.min(1, clampedRating - index)) * 100;

          return (
              <div key={index} className="position-relative me-1" style={{ width: '24px', height: '24px' }}>
                {/* Background star (empty/gray) */}
                <Star className="position-absolute top-0 start-0 text-warning" style={{ width: '24px', height: '24px' }} />

                {/* Foreground star (filled/black) with clip-path */}
                <div
                    className="position-absolute top-0 start-0 overflow-hidden"
                    style={{
                      width: '24px',
                      height: '24px',
                      clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
                    }}
                >
                  <Star className="text-warning" style={{ width: '24px', height: '24px', fill: "#ffc107" }} />
                </div>
              </div>
          );
        })}
        <span className="ms-2 small fw-medium">{clampedRating.toFixed(1)}</span>
      </div>
  );
};
