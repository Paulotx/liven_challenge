export default {
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY || 'default',

    publicKey: process.env.JWT_PUBLIC_KEY || 'default',
    expiresIn: 60 * 60 * 24 * 30,
  },

  secret_refresh_token: '2b353d95d6a83d8b6418fb6c75cdabb3',
  expires_in_refresh_token: '30d',
  expires_in_refresh_token_days: 30,
};

// export default {
//   jwt: {
//     privateKey:
//       '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEArcXdfLFFEGZjmeqJ9IUC+XnkWbNYztivlPr8dbgUupXi9DJE\nFyL8FX87xZWpYKlOmhn4mTPZjMK3rwWPRlRb2WHbkdfoL07Fm2CIsVBpEhzZecWG\nT90m8Q8rIAy6bdbuZwaHBDvOCtxt+xbX5yzQsi7P3XNjR6hjHM4oKubZqeYHpu1Q\n2Kg8/wH7y+5BOp+e2sKdi5ypTbkqZyrSxv/7V1lHzaVfG//41Ji0lkNppoItmerE\nnIwuydvrpuQMORWS0BBTNkgdOXB2NyVOBAY0kVSMI98M+gB6Iplp4C6fePbNFtTN\nPPxoKPWXtcYFJOm2nzsR56k2cl8myv5Mt7z6fwIDAQABAoIBAA4TBIlg4jMd19tT\nf7DqRP9nu/L3761xJ2dtnJz8N9GU6jjVCWbGUpx7HaA3KuzFSbR5fgUKigg4jSAD\n10Le+kF1B4+caRXLz31yKCAUXy40X/jY4rP9OXY0wE1sOn1C9zQo9y6EmX+Psuiv\nRPVYT97eo79P5S6cmMpweBhhciesc4rj5RnBo6nJFjYTf1d6HIPLGua00kXPATAy\nKn2Hfsqmcyk4Ci/O07o0uwMpqTyn4qP5un0L++I7JLnB6zvm3a2hTU0aJFQal4C/\nWB58YpHUnvPBKzeC22wzbce8HgUU6keID7/JUavc0hgfsajNNw5SF5tY2+5x+2Lz\nwsppp+ECgYEA5zEAbhXIvxZgECd2kVCncpCu7hl3hEP8YHdHwL5zoO6rbUSwX0nh\nylSiLty3Vxlgf/hrscfq4KW9lU92y1kIyVxmr9BXziToZ+PySIR6F5plOiCu9k8r\nR+kGzFEMqfrgE0LkI2DK81ITTqRN8VHEFspxsTKS/ogUed0aejNMByUCgYEAwGuI\n9J9v6u8nzflEsFlnrdZYbTAuW4GreYeM5nLxO6G49Jg8aDIkLzjBN/wSIUtK/wxa\nr7sLwAw+aWWTNcqI8uenkVdNzektZ3v100BweaaHG5eI4TJaXCIXodf2qTuVgLP+\n+VlYKYuGv6qO8s/r8wAjLw72nWw5nEscEeHKi9MCgYAU12IGiogyUb4PNr+FkhPG\nTCy44irYDZjuyVH6mjCqTVm+2/ZaYLquFrsYJmWQwITmhGqQ+EjAP7C7iRJYeopE\nPMQ1DT8dIk6hLvdkeizXe9+sQc4D/lcUgHlQae4OVMNmeR0/4zXogXmkGUO9gXV/\n6HgfVUPTFkliQwBkC8PK0QKBgCGb5s0LeCnp4eL5MgU3aIOVl9ZifwZerMvKYFL0\nKqyGv96BJLPyZh2VZTJZJfWIyC2qQ8DEA/ZkbRZNtpvDp4395mfdfuqDWvnjTfm7\nHKoy6xBntHHZMK09CzGqnhvLG37icZut/lcrVrrtmJBSvtyv3nVewLaYa6uf9uQs\nswsfAoGBAKSDykvRXKUY4Rsyosy6vVoOmPa0dG0+qKB9oEUNJYF2O0d5c84fwLLI\niQ6GRzTWRqS5vRpT7A2OXPFvEWaBZVsAygX83I1oJljzuobdVrXjf3BPaNesaUfL\n6fXfbQxZybN/sD3TAMWCHJEuvG7csaJfWWq4WII9pO9YDeJUybqM\n-----END RSA PRIVATE KEY-----',

//     publicKey:
//       '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArcXdfLFFEGZjmeqJ9IUC\n+XnkWbNYztivlPr8dbgUupXi9DJEFyL8FX87xZWpYKlOmhn4mTPZjMK3rwWPRlRb\n2WHbkdfoL07Fm2CIsVBpEhzZecWGT90m8Q8rIAy6bdbuZwaHBDvOCtxt+xbX5yzQ\nsi7P3XNjR6hjHM4oKubZqeYHpu1Q2Kg8/wH7y+5BOp+e2sKdi5ypTbkqZyrSxv/7\nV1lHzaVfG//41Ji0lkNppoItmerEnIwuydvrpuQMORWS0BBTNkgdOXB2NyVOBAY0\nkVSMI98M+gB6Iplp4C6fePbNFtTNPPxoKPWXtcYFJOm2nzsR56k2cl8myv5Mt7z6\nfwIDAQAB\n-----END PUBLIC KEY-----',
//     expiresIn: '15d',
//   },
// };
