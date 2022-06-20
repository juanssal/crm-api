const { append } = require("express/lib/response");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crm_radios",
  password: "Horchata3!",
  port: 5432,
});

// COMMENTS
const getComments = (req, res, next) => {
  pool.query("SELECT * FROM comments", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getCommentsByDeal = (req, res, next) => {
  const deal = req.params.deal;
  pool.query(
    "WITH temp_table AS(SELECT deals.deal_id, deals.details, comments.content FROM comments LEFT JOIN deals ON comments.fk_deal= deals.deal_id) SELECT * FROM temp_table WHERE deal_id = $1",
    [deal],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getCommentsByUser = (req, res, next) => {
  const user = req.params.user;
  pool.query(
    "WITH temp_table AS(SELECT deals.deal_id, fk_user, deals.details, comments.content, comments.created_at FROM comments LEFT JOIN deals ON comments.fk_deal = deals.deal_id) SELECT users.name, temp_table.content, temp_table.created_at FROM temp_table LEFT JOIN users ON temp_table.fk_user = $1",
    [user],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// const getCommentsByPeriod = (req, res, next) => {
//   const period_start = req.params.period_start;
//   const period_end = req.params.period_end;
//   pool.query(
//     "SELECT * FROM comments WHERE (created_at BETWEEN $1 AND $2)",
//     [period_start, period_end],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(results.rows);
//     }
//   );
// };

const createComment = (req, res, nex) => {
  const { fk_deal, content } = req.body;
  pool.query(
    "INSERT INTO comments (fk_deal, content) VALUES ($1, $2);",
    [fk_deal, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Result added`);
    }
  );
};

const deleteComment = (req, res, nex) => {
  const comment = req.params.comment;

  pool.query(
    "DELETE FROM comments WHERE comment_id = $1",
    [comment],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Comment deleted`);
    }
  );
};

// DEALS
const getDeals = (req, res, next) => {
  pool.query("SELECT * FROM deals", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
const getDealsById = (req, res, next) => {
  const deal = req.params.deal;
  pool.query(
    "WITH temp_table AS (SELECT deal_id, fk_customer, name, monthly_value, one_off_value, details, contract_duration, status, mail, deals.updated_at FROM deals LEFT JOIN users ON deals.fk_user = users.user_id)SELECT temp_table.deal_id, temp_table.fk_customer, customers.name, temp_table.monthly_value, temp_table.one_off_value, temp_table.details, temp_table.contract_duration, temp_table.status, temp_table.mail, temp_table.updated_at FROM temp_table LEFT JOIN customers ON temp_table.fk_customer = customers.customer_id WHERE deal_id=$1;",
    [deal],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
// I need to expand this, because this is going to become the default getDeal function.
const getDealsByUser = (req, res, next) => {
  const user = req.params.user;
  pool.query(
    // "SELECT user_id, name, details, monthly_value, one_off_value FROM deals LEFT JOIN users ON deals.fk_user = users.user_id",
    // "WITH temp_table AS (SELECT deal_id, fk_customer, name, monthly_value, one_off_value, details, contract_duration, status, mail, fk_user, deals.updated_at FROM deals LEFT JOIN users ON deals.fk_user = users.user_id)SELECT temp_table.deal_id, customers.name, temp_table.monthly_value, temp_table.one_off_value, temp_table.details, temp_table.contract_duration, temp_table.status, temp_table.fk_user, temp_table.mail, temp_table.updated_at FROM temp_table LEFT JOIN customers ON temp_table.fk_customer = customers.customer_id WHERE fk_user =$1 ORDER BY monthly_value DESC LIMIT $2;"
    "WITH temp_table AS (SELECT deal_id, fk_customer, name, monthly_value, one_off_value, details, contract_duration, status, mail, user_id, deals.updated_at FROM deals LEFT JOIN users ON deals.fk_user = users.user_id)SELECT temp_table.deal_id, customers.name, temp_table.monthly_value, temp_table.one_off_value, temp_table.details, temp_table.contract_duration, temp_table.status, temp_table.user_id, temp_table.mail, temp_table.updated_at FROM temp_table LEFT JOIN customers ON temp_table.fk_customer = customers.customer_id WHERE user_id = $1 ORDER BY monthly_value DESC LIMIT 4",
    [user],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getDealsByCustomer = (req, res, nex) => {
  const customer = req.params.customer;
  pool.query(
    "SELECT customers.name,deals.details, deals.monthly_value, deals.one_off_value FROM deals LEFT JOIN customers ON customer_id = $1",
    [customer],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getDealOverview = (req, res, nex) => {
  pool.query(
    "WITH temp_table AS (SELECT deal_id, fk_customer, name, monthly_value, one_off_value, details, contract_duration, status, mail, deals.updated_at FROM deals LEFT JOIN users ON deals.fk_user = users.user_id)SELECT temp_table.deal_id, customers.name, temp_table.monthly_value, temp_table.one_off_value, temp_table.details, temp_table.contract_duration, temp_table.status, temp_table.mail, temp_table.updated_at FROM temp_table LEFT JOIN customers ON temp_table.fk_customer = customers.customer_id ORDER BY monthly_value DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getDealOverviewWithLimit = (req, res, nex) => {
  const limit = req.params.limit;
  pool.query(
    "WITH temp_table AS (SELECT deal_id, fk_customer, name, monthly_value, one_off_value, details, contract_duration, status, mail, deals.updated_at FROM deals LEFT JOIN users ON deals.fk_user = users.user_id)SELECT temp_table.deal_id, customers.name, temp_table.monthly_value, temp_table.one_off_value, temp_table.details, temp_table.contract_duration, temp_table.status, temp_table.mail, temp_table.updated_at FROM temp_table LEFT JOIN customers ON temp_table.fk_customer = customers.customer_id ORDER BY monthly_value DESC LIMIT $1",
    [limit],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const createDeal = (req, res, next) => {
  const {
    fk_user,
    fk_customer,
    details,
    monthly_value,
    one_off_value,
    contract_duration,
  } = req.body;
  pool.query(
    "INSERT INTO deals (fk_user, fk_customer, details, monthly_value, one_off_value, contract_duration) VALUES($1, $2, $3, $4, $5, $6)",
    [
      fk_user,
      fk_customer,
      details,
      monthly_value,
      one_off_value,
      contract_duration,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Result added`);
    }
  );
};
const updateDeal = (req, res, nex) => {
  const deal = req.params.deal;
  // const id = req.params.id
  const {
    status,
    details,
    monthly_value,
    one_off_value,
    contract_duration,
    fk_customer
  } = req.body;

  pool.query(
    "UPDATE deals SET status=$1, details=$2, monthly_value=$3, one_off_value=$4, contract_duration=$5, fk_customer=$6, updated_at=NOW() WHERE deal_id=$7",
    [
      status,
      details,
      monthly_value,
      one_off_value,
      contract_duration,
      fk_customer,
      deal,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Result modified`);
    }
  );
};

const deleteDeal = (req, res, nex) => {
  const deal = req.params.deal;

  pool.query("DELETE FROM deals WHERE deal = $1", [deal], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Deal deleted`);
  });
};

const getCustomers = (req, res, next) => {
  pool.query("SELECT * FROM customers", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createCustomer = (req, res, nex) => {
  const { name } = req.body;
  pool.query(
    "INSERT INTO customers (name) VALUES ($1)",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Result added`);
    }
  );
};


const updateCustomer = (req, res, nex) => {
  const customer = req.params.customer;
  // const id = req.params.id
  const {
    name
  } = req.body;

  pool.query(
    "UPDATE customers SET name=$1 WHERE customer_id=$2",
    [name, customer],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Result modified`);
    }
  );
};

const deleteCustomer = (req, res, nex) => {
  const customer = req.params.customer;

  pool.query("DELETE FROM customers WHERE customer_id = $1", [customer], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Customer deleted`);
  });
};

// USERS ROUTES

const getUsers = (req, res, next) => {
pool.query("SELECT * FROM users", (error, results) => {
  if(error) {
    throw error;
  }
  res.status(200).json(results.rows);
})
}

const getUserById = (req, res, next) => {
  const user_id = req.params.id;
  pool.query("SELECT * FROM users WHERE user_id=$1",[user_id], (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
  }
  

const updateUser = (req, res, next) => {
  const user_id = req.params.id;
  // const id = req.params.id
  const {
    password
  } = req.body;
pool.query(
  "UPDATE users SET password=$1 WHERE user_id=$2",
  [password, user_id],
  (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Result modified`);
  }
  )
}

module.exports = {
  getComments,
  getCommentsByDeal,
  getCommentsByUser,
  createComment,
  //   getCommentsByPeriod,
  deleteComment,
  getDeals,
  getDealsById,
  getDealsByUser,
  getDealsByCustomer,
  getDealOverview,
  getDealOverviewWithLimit,
  createDeal,
  updateDeal,
  deleteDeal,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getUsers,
  getUserById,
  updateUser
};
