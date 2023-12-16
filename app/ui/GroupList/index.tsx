let templist = ['Group1', 'Group2', 'Group3', 'Group4'];
import useDatabasenames from './fireproofcustomhook';
import Link from 'next/link';

const GroupList = () => {
  let databasenames = useDatabasenames();
  // console.log('These are the returned database names', databasenames);
  let list = databasenames.map((value, index) => {
    return (
      <li key={index}>
        <Link href={`/Group/${value}`}>{value}</Link>
      </li>
    );
  });

  let content;
  if (databasenames.length != 0) {
    content = (
      <div className="text-center text-lg font-semibold text-white">
        <ul>{list}</ul>
      </div>
    );
  } else {
    content = (
      <h4 className="text-center text-lg font-semibold text-white">
        Fetching groups names
      </h4>
    );
  }

  return <div>{content}</div>;
};

export default GroupList;
