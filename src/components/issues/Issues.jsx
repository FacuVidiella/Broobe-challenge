import { useEffect, useState } from "react";
import { Issue } from "../index";
import { Pages } from "../index.js";
import { getIssues, getPriorities, setLocalStorage } from "../utility-funcs";

export const Issues = ({ token }) => {
  const [issues, setIssues] = useState();
  let [itemsPerPage, setItemsPerPage] = useState(6);
  let [currentPage, setCurrentPage] = useState(1);
  let finalItemIndex = currentPage * itemsPerPage;
  let indexOfFirst = finalItemIndex - itemsPerPage;
  let currentItems = issues?.slice(indexOfFirst, finalItemIndex);

  useEffect(() => {
    return async () => {
      setIssues(await getIssues(token.token));
      setLocalStorage("priorities", await getPriorities(token.token));
    };
  }, []);
  const paging = (pages) => {
    setCurrentPage(pages);
  };

  return (
    <div className="container">
      <div>
        {issues?.length ? (
          <Pages itemsPerPage={itemsPerPage} issues={issues} paging={paging} />
        ) : null}
        {!issues?.length ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            No issues available
          </div>
        ) : (
          <div className="row">
            {currentItems.map((issue, key) => (
              <div className="col pb-5" key={key}>
                <Issue
                  issue={issue}
                  token={token.token}
                  priorities={JSON.parse(localStorage.getItem("priorities"))}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
