
select * from customers ; 
select * from addresses; 

select * from orders ;
select * from order_items;

select * from products; 
select * from cart; 
select * from coupons; 

truncate table coupons ;

UPDATE customers 
SET reward_points = 0 
WHERE id = 'eafaf767-e598-42c9-adef-8aace2a0b005';

ALTER TABLE orders ADD COLUMN reward_points INTEGER DEFAULT 0;


CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    code VARCHAR(20) UNIQUE NOT NULL,
    discount INTEGER NOT NULL DEFAULT 10, -- Default 10% discount
    is_used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '30 days', -- Expires in 30 days
    created_at TIMESTAMP DEFAULT NOW()
);


TRUNCATE TABLE orders , order_items ;
ALTER TABLE orders DROP COLUMN reward_points;
ALTER TABLE customers ADD COLUMN reward_points INT DEFAULT 0;



