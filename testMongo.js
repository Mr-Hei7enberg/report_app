db.reports
  .aggregate([
    {
      $match: {
        name: { $in: ["Nikolai"] },
        workType: { $in: ["TP", "Dovidka", "Podil/Vydil"] },
      },
    },
    {
      $group: {
        _id: {
          name: "$name",
          year: { $year: "$reportDate" },
        },
        ploshad: { $sum: "$ploshad" },
        oshibki: { $sum: "$oshibki" },
        count: { $sum: 1 },
      },
    },
  ])
  .pretty();

// Все ошибки по имени
db.reports.aggregate([
  { $match: { name: { $in: ["Stepan"] } } },
  {
    $group: {
      _id: { name: "$name" },
      oshibki: { $sum: "$oshibki" },
    },
  },
]);

db.reports.aggregate([
  {
    $match: {
      name: { $in: ["Nikolai"] },
      workType: { $in: ["TP", "Dovidka", "Podil/Vydil"] },
    },
  },
  {
    $group: {
      _id: {
        $dateToString: { format: "%Y-%m-%d", date: "$reportDate" },
      },
      ploshad: { $sum: "$ploshad" },
      oshibki: { $sum: "$oshibki" },
      count: { $sum: 1 },
    },
  },
]);

db.reports.aggregate([
    {
      $group: {
        _id: "$workType",
    }
  }
  ]).pretty();
