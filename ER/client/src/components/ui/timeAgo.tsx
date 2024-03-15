import React ,{FC} from 'react';
type Props = {
    time: Date;
    };
const formatTimeAgo:FC<Props> = ({time}) => {
    const timeDiffMilliseconds = Math.abs(new Date(time).getTime() - new Date().getTime());
    const timeDiffHours = timeDiffMilliseconds / (1000 * 60 * 60);
  
    if (timeDiffHours >= 24 && timeDiffHours < 7 * 24) {
      // Convert to days
      const days = Math.floor(timeDiffHours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (timeDiffHours >= 7 * 24 && timeDiffHours < 30 * 24) {
      // Convert to weeks
      const weeks = Math.floor(timeDiffHours / (7 * 24));
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (timeDiffHours >= 30 * 24) {
      // Convert to months
      const months = Math.floor(timeDiffHours / (30 * 24));
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      // Default: show hours
      return `${Math.floor(timeDiffHours)} ${timeDiffHours === 1 ? 'hour' : 'hours'} ago`;
    }
  };

  export default formatTimeAgo;
  
