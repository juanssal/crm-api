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
    "SELECT * FROM deals WHERE deal_id = $1", [deal],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};
// to check
const getDealsByUser = (req, res, next) => {
  const user = req.params.user;
  pool.query(
    "SELECT user_id, name, details, monthly_value, one_off_value FROM deals LEFT JOIN users ON deals.fk_user = users.user_id",
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
    "SELECT customers.name,deals.details, deals.monthly_value, deals.one_off_value FROM deals LEFT JOIN customers ON deals.fk_customer = $1",
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
  const limit = req.params.limit;
  pool.query(
    "WITH temp_table AS (SELECT * FROM deals LEFT JOIN users ON deals.fk_user = users.user_id)SELECT temp_table.deal_id, customers.name, temp_table.monthly_value, temp_table.one_off_value, temp_table.details, temp_table.status, temp_table.mail FROM temp_table LEFT JOIN customers ON temp_table.fk_customer = customers.customer_id ORDER BY monthly_value DESC LIMIT $1",
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
    "INSERT INTO deals (fk_user, fk_customer, details, monthly_value, one_off_value, contract_duration) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
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
  const { status, details, monthly_value, one_off_value, contract_duration } =
    req.body;

  pool.query(
    "UPDATE deals SET status=$1, details=$2, monthly_value=$3, one_off_value=$4, contract_duration=$5 WHERE deal_id=$6",
    [status, details, monthly_value, one_off_value, contract_duration, deal],
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
  createDeal,
  updateDeal,
  deleteDeal,
};
