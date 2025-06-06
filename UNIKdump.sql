PGDMP  ;                     }            UNIK    17.2    17.2 1    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    62249    UNIK    DATABASE     y   CREATE DATABASE "UNIK" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE "UNIK";
                     postgres    false                        3079    62265 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                        false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                             false    2            �            1259    62383 	   addresses    TABLE     ]  CREATE TABLE public.addresses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    address_line1 text NOT NULL,
    address_line2 text,
    city text NOT NULL,
    state text NOT NULL,
    pincode text NOT NULL,
    country text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    address_name text
);
    DROP TABLE public.addresses;
       public         heap r       postgres    false    2            �            1259    62293    cart    TABLE       CREATE TABLE public.cart (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    product_id uuid,
    quantity integer,
    created_at timestamp without time zone DEFAULT now(),
    size integer,
    CONSTRAINT cart_quantity_check CHECK ((quantity > 0))
);
    DROP TABLE public.cart;
       public         heap r       postgres    false    2            �            1259    62471    coupons    TABLE     V  CREATE TABLE public.coupons (
    id integer NOT NULL,
    user_id uuid NOT NULL,
    code character varying(20) NOT NULL,
    discount integer DEFAULT 10 NOT NULL,
    is_used boolean DEFAULT false,
    expires_at timestamp without time zone DEFAULT (now() + '30 days'::interval),
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.coupons;
       public         heap r       postgres    false            �            1259    62470    coupons_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coupons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.coupons_id_seq;
       public               postgres    false    225            �           0    0    coupons_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.coupons_id_seq OWNED BY public.coupons.id;
          public               postgres    false    224            �            1259    62250 	   customers    TABLE     �  CREATE TABLE public.customers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying(50) NOT NULL,
    fullname character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    phone character varying(15) NOT NULL,
    dob date NOT NULL,
    registrationdate timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    refresh_token text,
    reward_points integer DEFAULT 0
);
    DROP TABLE public.customers;
       public         heap r       postgres    false            �            1259    62414    order_items    TABLE     �   CREATE TABLE public.order_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);
    DROP TABLE public.order_items;
       public         heap r       postgres    false            �            1259    62397    orders    TABLE     7  CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    address_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    payment_status character varying(20),
    payment_method character(10)
);
    DROP TABLE public.orders;
       public         heap r       postgres    false            �            1259    62276    products    TABLE     �  CREATE TABLE public.products (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    color text NOT NULL,
    material text NOT NULL,
    cost integer NOT NULL,
    main_image_link text,
    other_images text[],
    gender text NOT NULL,
    stock_left integer NOT NULL,
    category text,
    CONSTRAINT products_gender_check CHECK ((gender = ANY (ARRAY['Men'::text, 'Women'::text])))
);
    DROP TABLE public.products;
       public         heap r       postgres    false    2            �            1259    62581    reviews    TABLE        CREATE TABLE public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    product_id uuid,
    rating integer,
    summary text,
    full_review text,
    sentiment_score double precision,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5))),
    CONSTRAINT reviews_sentiment_score_check CHECK (((sentiment_score >= ('-1'::integer)::double precision) AND (sentiment_score <= (1)::double precision)))
);
    DROP TABLE public.reviews;
       public         heap r       postgres    false            �           2604    62474 
   coupons id    DEFAULT     h   ALTER TABLE ONLY public.coupons ALTER COLUMN id SET DEFAULT nextval('public.coupons_id_seq'::regclass);
 9   ALTER TABLE public.coupons ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    225    225            {          0    62383 	   addresses 
   TABLE DATA           �   COPY public.addresses (id, user_id, address_line1, address_line2, city, state, pincode, country, created_at, address_name) FROM stdin;
    public               postgres    false    221   �A       z          0    62293    cart 
   TABLE DATA           S   COPY public.cart (id, user_id, product_id, quantity, created_at, size) FROM stdin;
    public               postgres    false    220   NC                 0    62471    coupons 
   TABLE DATA           _   COPY public.coupons (id, user_id, code, discount, is_used, expires_at, created_at) FROM stdin;
    public               postgres    false    225   !D       x          0    62250 	   customers 
   TABLE DATA           �   COPY public.customers (id, username, fullname, email, password, phone, dob, registrationdate, refresh_token, reward_points) FROM stdin;
    public               postgres    false    218   �E       }          0    62414    order_items 
   TABLE DATA           P   COPY public.order_items (id, order_id, product_id, quantity, price) FROM stdin;
    public               postgres    false    223   KH       |          0    62397    orders 
   TABLE DATA           s   COPY public.orders (id, user_id, total_amount, address_id, created_at, payment_status, payment_method) FROM stdin;
    public               postgres    false    222   KQ       y          0    62276    products 
   TABLE DATA           �   COPY public.products (id, name, color, material, cost, main_image_link, other_images, gender, stock_left, category) FROM stdin;
    public               postgres    false    219   qW       �          0    62581    reviews 
   TABLE DATA           u   COPY public.reviews (id, user_id, product_id, rating, summary, full_review, sentiment_score, created_at) FROM stdin;
    public               postgres    false    226   +`       �           0    0    coupons_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.coupons_id_seq', 61, true);
          public               postgres    false    224            �           2606    62391    addresses addresses_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.addresses DROP CONSTRAINT addresses_pkey;
       public                 postgres    false    221            �           2606    62300    cart cart_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public                 postgres    false    220            �           2606    62482    coupons coupons_code_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_code_key UNIQUE (code);
 B   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_code_key;
       public                 postgres    false    225            �           2606    62480    coupons coupons_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public                 postgres    false    225            �           2606    62262    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public                 postgres    false    218            �           2606    62264    customers customers_phone_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_phone_key UNIQUE (phone);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_phone_key;
       public                 postgres    false    218            �           2606    62258    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public                 postgres    false    218            �           2606    62260     customers customers_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_username_key;
       public                 postgres    false    218            �           2606    62419    order_items order_items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public                 postgres    false    223            �           2606    62403    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    222            �           2606    62284    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    219            �           2606    62590    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public                 postgres    false    226            �           2606    62608    addresses unique_address_name 
   CONSTRAINT     `   ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT unique_address_name UNIQUE (address_name);
 G   ALTER TABLE ONLY public.addresses DROP CONSTRAINT unique_address_name;
       public                 postgres    false    221            �           2606    62392     addresses addresses_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customers(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.addresses DROP CONSTRAINT addresses_user_id_fkey;
       public               postgres    false    4808    221    218            �           2606    62306    cart cart_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_product_id_fkey;
       public               postgres    false    4812    219    220            �           2606    62301    cart cart_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customers(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_user_id_fkey;
       public               postgres    false    218    4808    220            �           2606    62483    coupons coupons_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customers(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_user_id_fkey;
       public               postgres    false    218    225    4808            �           2606    62420 %   order_items order_items_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public               postgres    false    223    222    4820            �           2606    62425 '   order_items order_items_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_product_id_fkey;
       public               postgres    false    223    4812    219            �           2606    62409    orders orders_address_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.addresses(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_address_id_fkey;
       public               postgres    false    221    4816    222            �           2606    62404    orders orders_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customers(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public               postgres    false    218    222    4808            �           2606    62596    reviews reviews_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_product_id_fkey;
       public               postgres    false    4812    219    226            �           2606    62591    reviews reviews_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.customers(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public               postgres    false    4808    218    226            {   �  x��ҿn�0�Y~
?@y����ZM$-t�B�T��������v)ҡ�ʁ����DL����p0q��J��]LJ�r�!�xJ��(sd���������~_櫬�y��Q��ܿ�����}U+?�e���j�uT_�qf�=h�z�M�4�#���:r�0�
lY��@��8�0]<��>�G0.5ӱ��m���k���H��+�V���>�yQw��xae�6o�4����'���x���XՒ�r���P� K,�AB��>�E�l�o��ǿ'�?z4����&�Ҿ8���tq�>9p6�f�v�9��Xk�Ԅ*�by^���!٢�VN�J�lBK����*��|� ����u��2���|������ߘ[-�o���
��NM�t?]��A1Ā      z   �   x�-�ˍD1Dѵ_� -���l0���0ni�Z^�NԌ�a�Vr�`���i�.m��>�A��F;�9��;�����P��	�5`�v����"PS�Zo�$����K�}��q���lG_prݓ>"x�g�4DZŉcjP2��u�#�(p!�hY��	Xf��:��S�K���5��0~9�_я
�ۗ��y���zF�         �  x���;��0������<u���ƞt)Ҧ����%DI��b 3�@�|��'zQ�:�E?��������s���Ƿ�Hz�r�e  ��n9!W���,�Lr���a��i�lq��Q�Y��1/ѧ�9� ���w���RE*JRVA{��SP��M�.�C�*�����[n��bw>����'�l��*��(p�v��NeK����)(wp@W�9�h	Hv�*��2���8�
Xf��kn��jg&�8⤪'��Ҽ�V)h��*���C�@m�sІ[���q� ���w���q*dm뾸}
��?�R�x���/&�4CF|��SО�J6\�~V�*C�� ���R��3;:�k���X�+x�b��5�m
;�K��r����iϽR��B� hyS�      x   z  x���Io�0@��W��+�6��s�,m�4@S 	�Re[4;�_?��VS�i��=^��ABƉ*�(B2&+!35��Ԉ� R�fgQRbɾqw �Ǵ��np�
�?�Bd���
� �+��i>�I�Y8CN���Y�c�"��f����c��*輪�]���Eb�i�0��  2PexE�y�=@4F�]&i03+��n�C3�z�B¡N��v9N�����A1ɼ�[��L�y�;���7����jꘅ�$-��(���"OW�]�	��$�p6��U��L+}�^���#�M�ϔCo^\�K)��?��Z˛���g��� ����A�P'��5���L�(�XE�̄#$@�Jh���"Z!���Ϣ\E����c��"p�`8@�5����j=�z*TaT%�a���ca6�:]��r�6�dm�0���bꤩ�0s�x��u�2����W[�D5��"c�7�:m�Ǻ���>��F�f���Hw�3�(�����i��M������l�D�Z�e�M�X���0���i�������(�핯��V�v�;�-m|�l����S��b��G�R,G��F�~���Y�ݪ��S#xS�eH��#��zo� D
E�S(���*�N�>�*�      }   �  x���[�%)����B˘�^�c���zF�ǃJʒ�c��C�(�YXu̐GY��<�覞��"�ӝj���V�!G�`�9l�>zJg��l'_&5�sV�O�c� >gۦ����Kc��E�ck��²zBvj��\��^O�����9��[�g�z�ݤi�q}ݒ�[h�4�j�>�s,��H�g~���n�$3��Rȵ�0rj�v_q��'�k�N�ޅ��h��a��zՕx��J?�ԝ9]�aF[A��RW����%M�-n��l'tQ���q���W��CB�%r��S{�յ�R|�3���-h,�.�zq��TDe��*,���R������scԒW��zo��{-g'u>w
�0t�Pg�1k-#���9N1N��H��RB�l�{M���ފeʵ�������8��e#�V������)ĕ(�
s��I��y�_�7�
e�rfʜ���@a���L���[�h("��9B?5��W�s1�i�~�8���R	
rB^g���?/�a�of�<�'�qOY�����^�a��Gy\A@�xq~D�Z���+���lu��g�4�<c�hӼ��[�sW��EX��-̺Y�,�˘2�-���[vXH�e�j9����{��<�I��f@7�XNalh�����,o�ڱ/�6� �C39q}����:�tͬ���p��c�W-�����\y��n�Ԕ�E�8e	3�>��,���.P�ء�{��\�2<@�#!���V����t��恨�v:6�Gm�~��� W�"������2��JRƧG;�y�ZP��V�]��{�\�y&��C���V)\j��X�x�6~��ng� ���s��Lp,uz�OL��^��!�d��lH3r���j�}�V���*�z�,v񏼣�A�kW?��É^n4����J��[��_;��U���� (H��}Y�ۏ�_e1��B���:kv�m��i]��i�LM	^�KNp����i�l��;޵��P�)�Z4h��
�{��ǎ�~�xy��7�l�f8̥�~<4Dپr��$9�yyuq:���
yۙe=�qg�q�x��Q���0�v��s��[�׎���������|􈽕Ů�|���%q��Z�%B l��	���̳��|��fq�'r�0*�l��Fw�@�o�;�ړ�]��p�7$k��.m�]b�_�yJ��u*,3��j��H��tt?s������A���.��"P�~�G����6�2�� x=�y�k�d2�10�f�:g�
d8p*�k��~��£�f�������ɧ����]��L囍���c�e�p?`�ƕ��׊N`oZg ���ly6{%mC�qr��Ģ���X.�5�1ۄ�@�⹠Y�q��x��<j�\����,�a�<�L�����0Xg���Zs���$Ĭ�Q{��bĐg\ix��1s`M�5?/�\��Һv)����A��g#��f/�3�)��3��Q/���L�~�6�pRM�h�]ub�Q+�&�2��Q���l|�[�$�!�ۭ�#�r��q?�`S���]5���I�o�=�\���:���=Ö�Xo����~���1�8��������_������^8po���6�ӑ)����fb�*����$b�N��m���¯�!E�#@1 ���͸8���d_*Oș�j�w$q��u��֜�s�Hۆ��s5�4��ËcJ$�&�X{�q�c��������Z��Q�Grwj�K�I��y�>�,W!�2�}��<Lŗx� 5�S��rA�_���o��C�㫗4�c��?������r�,�OBs_kc��a�,�o�nLek���Äd�n��ma}o����'��SW�Uv��І������@��lH������g8��w�r�v税Nߠ�|�:���S�q4��qW��p��w�ڂ���7�aX��z|NB��������Ԯ����k�D�4w��գZ�N�?�%t���f�l��I��Qp��f�6��Ђ�%Q>R8�߲K.��H��}&���aa�4��C�1{X��,���/'��0;�������[�q��]����E�!�r�b���(c G#�Vx~Npފ3;A��`��M������ZqR���u�z�D�j��J��~ I�4F y������ѡ���H{��)6B*ʿ���Kt����^[�����c��'�`�v�t��"���u�sN��R�$a1Nw���ux��h�b6_;f�KV�s!E�f���V�^+��[�ǎ���_��_�1      |     x���Kn�9���*�� )��*j=ѳ������\�BW�n�_K��8<��l�='1�TX(u�%�^gԜ���������%��l��A)�Vk^&���#�E��S�V�Tr�Tj����2��Q��!�D_����˵��o���������|��ߗ���'��VIj�W�.��Ō�� �".��>r�r�j���u�����_��7B�i<+"8+!�{����r�j2 R�O�bWf��wi��K�	��9RtՄ{CW[�u��~>хT��F��N��Aj[�g�¢82�SkR��g��_闠�(ޅ��*��\k*p���5���Q����C�2���Vf�%<i1��uR�Q�����e�ݶ�����{�N���+���|�,k��D������Z�^�������0��n�G7�����#U9M�KN��'����� %�2���z�AI��C��1Sε� ;�1���õJi���Af�#��)7d��9�K.�G[6������*��w��.��|m�;Cͫ�L�~_�ʓk���z�r&���-�#�8���n9�����H~�>$_��������'=2Ҹ�S��M֦!כ����P�x\U��6�[���ޘ(��P��fnd�L x>$F�_�*���.�;�Fij�A�H)P�	��#���>���B9� u�\�v��@�vk�ЄP;��'GR�A��|U+���4��i�#�[ô���,d�ɑ����R��d���wNc���&XGK\帶�e}P>���m&f����ZX�ʴ�ց��&Fb�M�n��C��L��������w$c:
� �)�8+y�O��XNIReP�NF��Y��6�vkI�k����+ �^^��mI��:;>�U0��8 B5�Fd�6�_@�`�`c8Mp�@��4*A�ud��	%��s����Z�/ 3fΥ9�w�A�D�TD_{p@�h�t"x�Bݟ<�����}�z�@��_7\�.�$��TD�Y��L��!ϗ_�a�v���0A��6���"�h�4��l��?��g��ԝ��_ Z��乏���O;1u��!��t����AtY\�Ʒ�M��T�;vY,��D�f��}�3�|:$��Ƀ�ݎnm�vCόr�d�}n1TR
�� �*n;�ܐ�H����x
F�P���$�+ٛ	�˜(�v*�V�FMB}�"���/;��(,�2_���߿[@g���!��ub�BW�~�?��'�1(H\it�&Nfl
�h(�R������c�݇�������B���r�*��-�nw�r�7����w��(t�c~~ĳ������8�g)x�c �������:�^}d��
�{�=���4�y�(�e�vb���~A����cν#�-������l���+�bɦ9z&!�.d9�k��M��2���� T��KޛO
�ݟ�����I�=����}OM}$�����y��˞��R��.��Y�zJU��v��)b�:���ה�%�R�	!7�M�+ ���L���#s"F��R���Frx44V����(q� �؏����|��?�6&      y   �  x�ݚYo[����_��E����FA)��Z�KN��mU�jl��]�����&ڭ�����﷧���}���`Ip]Iq���,��*5,i��.7a�����ޕp]��[�ǭ��h4�������ѧ�?�~}u>��W��W��W�����C�����t.����}�;�pyqrءw���.1���݇?����Mo���O��O�r�rX��Éb߅P�����7\1��7�m��_[G�b��m�*YF<;G�8(��r�5�Tݒ���X�����ޔ�G5�:��o�O�2�Ax�(� H��/�H�h��) tBuQ����pt��l�5	��s5!����6�83AtQ2��%%]2r�TkbNW�\���/;{7ɛ���'�.N��p�|4���.E'M	��]g���ӟN�v���^�p����������瑘 ���,F¯��I
�K��f��k�f�����5�GQ�<N"�7�~7��q��ʝ����I�(T�8�td�HϾ��H���2���MQhc�	ԉ�d"f�vb������{�=Z'&�$2�`UB,���U����{X����蟜����6D�&^Q��lhot!g�$/� i}��fG�@G�N��!�bMP����X.f6��;��u���oAn�*�C�rO�f4�a�
Q/��m�����0��˗9���ZC�%�Ye�xє�X"nU���	�A�w�{�;��;�� o+�Ve�E�Gf�yd2EU�k����'W��ax��v�|�>�&۞�T�VL\�߸��>�R���O��fro�"s7�}M�"Ǜxt!*0�Q��l���0Pw�����*=���n�n0H� �B��iyań(0�~7�3���Y���P��Oz������f���\�5j�MD&LdCD�QĢ�>0t�,���"��MB�W�0��%���= e�^j��_�|�20�(�ʴ��p�et�e�o�%�NZ+�`m0+��6�1P+	���J���r�JH���۬�Sb�+/�ѩRX�߀^3Xt�3W���Mb��e?~\�L��藿,B6����?��oX�N9/��*��
�XAr��Q�ͤϳ�=܏�p�:o�c�g�]dݸB��X��z����.5�V�3j&#꼃�h�Zyt5�z��7�\q9c�4�+Մ�Z5�H����_<[����*�L9�||����=����
�gq�ԛ�ˣ�߾��[��65*�#ae3����F0��d.��|��?gY����,��������He���D���ň{�{t)�󲄻|!ͯ�Ua������ls�,�=���e��#��\���s��\<Ɣ-�/#?"dU�?Ϡ�#�op�H�\��B\���?ىΎ�G��ɣ�%���<����r3'?�C��w>�߇����'�'�Ó��)�w����y/�%�`ók��X���5fj�+��X)m"hK^b��ڒ��Ws�橝�+r���8Y�|�y��&����JF=�=V2d�r�s��	K����<k��ඁ��T����
�O-������$RL��'b�M�T� a���+ķ��&�5��-��d�О?Ao���Eza�Jĳoyh@�,f�DwJm��u�&���ۙd�>'�/ $t��^�B'�PĲx�_�ϭ���b�.e<��D<��cCP������m'�B4��sl�nEA1��`Jz|���ga���njo+�:
yk���H/�Ba��b����[B��a�m�]H�Gћ���y-2^��g����o2Զyq6EH��W����Ll�%ˬi�����������.,�RK�Lt%��� S �d�p<C˯�l���z�x_I��g
�� E�%�ƴ�鷪��L�	���j�s�%Pn�	�O��!�XV�d�����J�]�6�j�U!0����\r�ˬ$IT�-���]��[M�~'㯽���7X u2К�<�BP��T�F6������^Ys�/Va puWӤ�`M��*%����31��R6KfIN.ڒ0�P����&+I��<��v��j���^vò����G;%G�*���5����S6 �,/��>��PJ��J��T�J��5�`;����΁,@�il�	�yZ���K�*�WM@�jΜ��?&�g��D���?��D.eG���c��D�p����m�V^��o�����F#�      �      x��\�r��u}���q��@�7�ObǮ�$��А`����h�>k��ƅ�tx&�J��.ױE�������j4aEEU��J�bS�<�r��B%U�g���nt���0I�U�еiD�ue"�a��MVI�3ɤJJ�I�"i�$��*	�]r�ݯ^LP��y1Cp��!��1h�!8��no�����ׁ�j��-x���6��`�T�O��xz~�����\�����5�:c�g�v�k;=҉�C����������d��EF�k��1�t}P��|��p��}O��_z0�.��p��4��%������s�w���1��&|=4���c`~���OW'�g�9p+���qz5��>���pm�����Ӈ��"o�8������Q?͋3��I�ëT������>��iڮ�%~����X��2_��}���]F��e ��8��=��+3��2��(#TX�"/�ZĪ��8�IQ��p�8������>��I,#�v��2�����W34���ê<��ݺZ;�~�;}�H��}ݍ�݉�|��p�!y5Ҥu��j�H��L������ȰΊ4�weYɼHb����Z�<�B7:�c�F�L�2�@UY(d��	L´J�L�u�4mu�����k�����o�~c�uf��N���X!�#�7k������PZ�1�OG¼���r����ݸ~��g��}��&���)���<N��`�љ�}�g���c`��L�ׁ���͋�;=�+��C��<�C��O&8=m��'k�ז�ƭOd�<�1�K		�a~E�*��(�c��X��F(a)jM*ʼ.D���J�83J�%I�+�H`����Z��L�,/�B����)3�IV"4Y�x�px5"KCY�%L&˻�������xNrA^���Nox��dF���J�Oxt��y3��*<�D��5y'/��O#1��_�y��x��ְX��zdן�C
��<uu�rs��#��v�vd6,-�Lؼ&��J�4�i|D&���?��G��S!������5���9c���ox =,���w����XIWRDț�>I��h�����Ψ�*tT���a�&)D%�(ײI��$���Y����0M�TB����p�Z�̔~aVy���\�O�Vz��l��fj+gv�i@P ��\*�z�p�?mg��=֧"�~4]4������D�Q~�tg3G���D�(t��c�bp�iN�AI��ȁ|4�c�d��HwF�?��4:"������8�����qbA��7.w*Ϝ�b!U �="L�4��B��".�*�"2��	�!����Pu^f:�-�ReYSE!T�h�eV	XK��DaS7w���ME�b��(t�<2Z��?�y�ޙ5�� ���V�i��\��t�9��AsB r�(����5VhjQ���_:	�y��(5##>�`�%��W���3�ݬ��ј�<PΧ����Ù*��;Q��@t�$�LC��O��
dz���D�"�U�krUGU�E\0Bf�o��25E�U�Ve|["l�$J�H�B �T�(�&J��J
꼼�wߛah���a��p\�K 2x�x������s������6�Uz󿦊��g!hQb�8�!u�1��H9��h���"��zB���Ƴj�r�j{q ���Ŝ�I$��&���qM�U6�(�ԭMM�=ute�'��ix���9d�,�j;�!d2'�Ŭ����>I#�Ż*�I��ц��B�$�W��S�4J�eT�ے$lE�>�%5q���]JT�)b��i
J��a�������wN��S�b���g_΀8�ۡ��!M-,����xbW�S��{�$�Z/5��S8�X�(��f��yo�_��R�����W}x��?9WT��߸*�0��JX���
��)*aHN+�$Qܜ�"�L@}{Y�Q��!a4�>���0c���a�!Q�d��mI���.�QV#݆�����i�j@��0#c���iA����N�A��m_��9���z�Q�*�@k��>i0�w`K���Q�����8��������`q��מ.7��	��u�2P_��1�+E)n�o�.���"�9,
4�ո�jB��_��dչ�	?� ӏxY�&.y�GA��G9 �^�Y$�%�*�B&G�eu*(E���2�-y*�8���4��41"G-E� ��$MM���K&CE�B�3�_�.�u�==�]e�t\��z��I�O�T�>>�r�Vs���l�R���9����Vfdm�ϙ#�%��J�f���HY��>WS�T*m�c@B�;ؿ�
�P%i�� �+%�D�B&yS�bC�5,t[�TҨ0���
�-�"Q�1�#UI�&!Ҥ�y�0f��7)���0��Y���r��iM1�r�g�o��X�af����1����)�.��3�LT�}��=Q��q��!�`Pf���2epYa�	{��~�π�5A""H�_d�7�>N^s�ܟK��	�L���r J�\X6R4"\AUMԡ)�\geZ%��ʦ4�Jd��ʴ��O4a� [6�%��_)�h���k�
��\4�Mem�v�����pj��<;�y�h��4�:����h�We{Yp���V0f\�'J=�t�`�M�����F�6���x��6�jm&�g�9fn�� ̰�:^ oq�O��eg�E���)dDA%���2e�Dy#���$o`�$�3��QFZ�8SN��w����*�x���m{�7�q���i�ٸmv%�豂�Ȇ�aM_8b���i���p�s��,���&��D����ܜ��I��3g�Z��t��@�G�\n���H���HIh2��l�QkĚ��ʂX�,�b6ߖ*S��q�4`J�e��fL��2�F'��r�f��TRһ�,-L����(�
����S�o�u3NA��f�U�	?��K���g]��G��V���e0Y
/�ݪ$�c?���5�͞���#�[���r#��d����E	��� ߫(+�dg����T�E��T2�����������Jf"+mH�֥h�*̓&Ty�?��j�,���).-L�8D/ژ���X�:��j)�M[1�BpO>�QZ$Pzh;s�K;DFxt��9��\���}�������hnPY?j�J��
ub2��q8���O0p{��$�L	 S@	�{%�#��4W ejI�0Q#-�+v��]Xy[Ҭe��"�D�5�V�j�V"�ˬ��J+�����Qf��g�<nȂ�'��DÉ
3&3�x��g&��·�o����'c'1��2@NpNʽ1m��z4�y.����q5m��ڋ�-a]�-H)�I(��[��>RE�&;�_��T�t�T�#��� @��F�fe�g�5�7�F8��L%*\�Xk���Br =���=�������~��Ƅ�܅tҿ2���ڳ뽂z@��4��8jѠ�DU�S����O<ұ��EAc�y�����k߃|>�7����;�Ŕ(��s"��29�x�&�PO2�W�>�2��5dI�)��YU�Ő�2�)��#r��Z\�"��Y��2eV���Oː��b�n&a
Ku��U�̊,��G���=c�^�Вe�@��b{���іs�e=���"�&����*���6�~8��3���Զ�?3nj�R�@�@��G:��Y����.T2CKʒ��m s
xBF;kDc�mi7�Ga�cV7����O~4�'^�3ۖ���RcK�����2�����7�cݬ�r'��2�|�ho�ã�k.�Yt3�{ϑK��kt��-!b
���mp���Ro?`�;k%D��kjjT�(b����tv[挪��7e^E^¬aQ��ⴐ��M5��xF�)�c��?��0c��N�o�Ο����An&}Ƽ�����=��̧���O�f����E's&�3�t�u��@0�6��F��	��?�qϾW���x���D2��}���x��(� )٢�:T>섏;�57Nvd&Y� G
��B�S��'�2�y(A���L�sh�-��j́��7��΍�[W��ؿ�:����O�,A;hd��6J�mK�t�   c��e��'>՞z���d�+�8+����Q��U^G�S���˜�\��#�O�L�@�l)�^�R
��'K��F
�ˤlM���)u��6)�#�@���i�p�4�7�ش��s��о����DI=PoOT�N�Ip�e;��ɌNCk�j.M�'d߃i�"����s�m��RB�#�r$�t�P=��s��^>nd3�Y�f�I�.������f���l0DV�hꚸ���ju[��be����8���T�2��l�2Z��m/�����j����yW`�8��/��p��'�
�W2��	�����s���\j�����Go���iE�i���=Y_?/=��.�g׏�A�m���U�����b�ť`�{���ZF !S�8�O���$*v�\�m�%.��b�*�D��L�g���ljуpg���5�m�3�����`��t�8�V��ܸF#�6����j��62o,*�^f�9UFR�.k�\{V����w�1K�3ϐ$dݏ*�e���I����q�%cQT|��gە�my�x������͸�hR����R�|�ιp�2�b��*��SIf�bٜX`3����i"T�#G����Ư���(�З����E�	#�q6 ��8I���-���HȂhx0���\"w�n�Fjj�����C@�-_�fHl!2��r�k���Y��\��g���r�޲=��/*
��l��k��0���h����%����+z��������J��, �IwR�Re;k9\M �N,�k�O�}��r���t���ڛ�m�	,��k���/�"rL����Aj��η���,�պ"Κ{elPG�鉸��R��$6�Xњ��u�\|C�\oP��e��
���Q��d��xg�H����|���`��D]�;�m~�K�;�mZa�{u��R�Eȵ�HY�5��F�|��3��F`���xl�U1���~��̦���������)�	Zl��?9�\�*Ζ)�" @�}��e;k2�LYhj�������@�jx�-�av]�zٚX�o��F�&ʒ;��t˥�E�5�;Se銨�^�Ѹ4voۜ�æk��B� H�KaE[���c,��o� �2�w�R�-�7�q�%KU�'���h���mA��f�!냸�[E»������$�Ҥ�"���=�yN�SVD���و[5��'�gN������]d�3P��1���o<���kW#>�"����e�'rM�eP������>�ˣ����q��&���'����ܰh;���B��՜�u��g8G�+��o!^i�H�fB��*l$)�^����faz�5�;ĩeQ?@%�i�UP��Q�\��%�ι��J�m9�.��N����l<�CQ�\��x�3%A^~�=�s����`i�R�.uA�����-�G�~����5y*�TM�w����ax�Y��$ρ�v�fi)�WʦY+��`R ��bE�"Z����W�j�sYA��$k�`[�)S���I��9�dN(�b1g�>Q#�dԯr9}�.�@D�彦ǚ�u�o[�>ԱZ+���|�]u������ޱ�b#��a���$'�"Q(�v� �5�&s38�@���ܨ?�I&�L��2K<�W��_D�~��|=׾�%�'3�ۭt��
�\�^&룁82�'���$&���GM.��b�:�D��L.�0^��������2����Bfu�y�Ǚ���?jFv~7Ǻ�1p;p�v�u�?����jD��d�վ�q�YvL�լVYQv�a@��r���K~���cb�Yu�ś�@��o���΄�WG�פ\~�L�M��J��|E�p��2��qk��ǋ��i=b�U@�������D��n���C�E��,_&��H�b����AZ�|ԉńe��� u�_�̫���W��e�7�,U�и�)����iQ�|(��]Li�7��*[�dƎ�n�SF�"V�!x̽�t�E�%��N["H\�wy�D,��'ʇ>�i�����H�7��m�,���g���<q���v��Z+��o݀G�x�*�ӿ��r���*���D*�%qhR��d�2IE�F��uU\�a��X�n)ѝuJ�$����?v���w�ߺ�pަN���O
@E9�C��2'A�l��:��M���w�Vwi�M��������R�\M�lq�e^q\�f���Il�i��3)ר[U���~�e?N0�����r�=ۍ��أ�GA۠#��8M���X�f�OT<]�>biQ�#s��jW*7���ka�����G
�G�_On�o���?[�����mw����!����NCw�c'��\%�������<6��,]QS���{��2��Eg�!
#N86���eի-X�[��Ƒ�Y�"
y���Q(���'��m�F��Al��T��m�,u78���\ً�~nH,]���p6�f\m-r9��ڍo��t�mocn�{a�z[��K�!Q�aOzR��+ے($�b�[�%ݤ�Z)��3�&\�� ��E�:[}c�N��M	KNyd6+���:��z]���I��K�Dmi��>�ug���0�+iSh�ߗ�}���8$y>�rA�"��x�G��gz}����٤t�Bʽ����-�V�����վ݁k��ח�w�%��D���1Q����~�����&���Q�����1!>�z�?X�ＫFK	�Ю�x�R�En�RC�j�A���glP�I#�}��W������qp����;�'�^+a��� <�z�𽑚�~�{[V��dQ�=+EQ�bI�X����vN(Sb�P}�,��b�h�����S���N���׾����TC9��ߕ�$������~ɧ7�ս|�j���eT�*]��F�S�m@v�&D��	�c�g�F�I,u}��{��FʞF6�B��1]�y�L%��ڶp}�2�EpC�bNFw�v��z�����=N��-8)�m��{���R+%c޽����b�j�\i����%�7L������^�����v�,��H���;K��L��$����k��7A�t��#�5�q�W�cg��o�s^�Ǖ��ǀN,���9YH���;> a�\��T�=~#�/�%���N�/^�dA��ԷY�8Vh��_6x���+���ƙ��T�/:������S���o�S�~NJ0�,\����8�/;�,9�_]�+��{�2~�Yƻ��O٭t��*��X��mw�q�T�?�����]�A��AB���D_Q��r��ɰھb�~z>؝i.���d��fp������B��+jf��
��uX��N1�EK %���R��t��i��M�+�%���yм"���@�U���I^v������W��|�jF��ћ�[i���i����}L|���z_��f��� ֿ�����Nn;����m{�f�K3&i�R��!H8̘'JM�: +E�oiU~F6�/��-)�:�qL�rU�a�� Ɋ�,K�j8�� �u%�d���*Eƾ��n�d�� ֧q+|FA;��}P�$N�g��-��4�JwU��E��8mr�K#t�"�!��TɼTէ>��ҿue��/�x'"
��e�i.���m����^�|�     