import React from 'react';

export default ({ match }: { match: any }) => {
  //    isExact: true
  //    params:
  //        cname: "后羿"
  //    path: "/herodetail/:cname"
  //    url: "/herodetail/123"
  console.log(match.params);

  return (
    <div>
      <h1>英雄名称:[{match.params.cname}]</h1>
    </div>
  );
};
