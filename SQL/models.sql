
CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT CHECK (quantity > 0),
    created_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    total_amount INT NOT NULL,
    payment_status TEXT CHECK (status IN ('Pending', 'Shipped', 'Delivered', 'Cancelled')) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW() ,
    reward_points INT Default 0
);



CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT CHECK (quantity > 0),
    price INT NOT NULL
);

CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(20) UNIQUE NOT NULL,
    discount INTEGER NOT NULL DEFAULT 10, -- Default 10% discount
    is_used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '30 days', -- Expires in 30 days
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reviews (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    summary TEXT,
    full_review TEXT,
    sentiment_score FLOAT CHECK (sentiment_score BETWEEN -1 AND 1),
    created_at TIMESTAMP DEFAULT NOW()
);


select * from customers ; 
select * from cart ; 
select * from products ; 
select * from customers ;
select * from orders;
select * from order_items;



