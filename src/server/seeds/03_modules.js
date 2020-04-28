exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("modules")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("modules").insert([
        {
          id: 1,
          title: "Javascript 3",
          start_date: "2019-07-28 13:50:26",
          end_date: "2019-08-04 13:50:26",
          class_id: 3
        }
      ]);
    });
};
