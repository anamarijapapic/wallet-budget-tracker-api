// // The name of each response payload should be model name defined in Request model schema.

// module.exports = {
//   getUsers: {
//     200: [
//       {
//         id: {
//           type: 'number',
//         },
//         email: {
//           type: 'string',
//         },
//         password: {
//           type: 'string',
//         },
//         created_at: {
//           type: 'number',
//           format: 'date-time',
//         },
//       },
//     ],
//     500: {
//       internal: {
//         type: 'string',
//       },
//     },
//   },
//   getUserDetails: {
//     200: {
//       id: {
//         type: 'number',
//       },
//       email: {
//         type: 'string',
//       },
//       password: {
//         type: 'string',
//       },
//       created_at: {
//         type: 'number',
//         format: 'date-time',
//       },
//     },
//     500: {
//       internal: {
//         type: 'string',
//       },
//     },
//   },
//   signup: {
//     200: {
//       id: {
//         type: 'number',
//       },
//       email: {
//         type: 'string',
//       },
//       password: {
//         type: 'string',
//       },
//       created_at: {
//         type: 'number',
//         format: 'date-time',
//       },
//     },
//     500: {
//       internal: {
//         type: 'string',
//       },
//     },
//   },
//   login: {
//     200: {
//       token: {
//         type: 'string',
//       },
//     },
//     500: {
//       internal: {
//         type: 'string',
//       },
//     },
//   },
// };
