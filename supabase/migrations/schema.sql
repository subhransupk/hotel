[
  {
    "table_name": "about_counters",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('about_counters_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "about_counters",
    "column_name": "about_section_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "about_counters",
    "column_name": "count_text",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": 20,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_counters",
    "column_name": "title",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_counters",
    "column_name": "subtitle",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_counters",
    "column_name": "sort_order",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "about_counters",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_section",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('about_section_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "about_section",
    "column_name": "website_content_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "about_section",
    "column_name": "hero_title",
    "data_type": "text",
    "column_default": "'About Our Company'::text",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_section",
    "column_name": "hero_subtitle",
    "data_type": "text",
    "column_default": "'Leading the way in hotel management solutions'::text",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_section",
    "column_name": "heading",
    "data_type": "text",
    "column_default": "'About Our Platform'::text",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_section",
    "column_name": "content",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_section",
    "column_name": "image_url",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_section",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "about_section",
    "column_name": "image_file_id",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "company_values",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('company_values_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "company_values",
    "column_name": "about_section_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "company_values",
    "column_name": "icon",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "company_values",
    "column_name": "title",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "company_values",
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "company_values",
    "column_name": "sort_order",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "company_values",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('features_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "features",
    "column_name": "features_section_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "features",
    "column_name": "title",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features",
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features",
    "column_name": "icon",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features",
    "column_name": "image",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features",
    "column_name": "sort_order",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "features",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features",
    "column_name": "image_file_id",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features_section",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('features_section_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "features_section",
    "column_name": "website_content_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "features_section",
    "column_name": "heading",
    "data_type": "text",
    "column_default": "'Powerful Features'::text",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features_section",
    "column_name": "subheading",
    "data_type": "text",
    "column_default": "'Everything you need to manage your property'::text",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "features_section",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('hero_section_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "hero_section",
    "column_name": "website_content_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "hero_section",
    "column_name": "title",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "subtitle",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "primary_button_text",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "primary_button_link",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 255,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "secondary_button_text",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "secondary_button_link",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 255,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "background_image_url",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hero_section",
    "column_name": "background_image_file_id",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "uuid_generate_v4()",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "owner_id",
    "data_type": "uuid",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "hotel_name",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": 200,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "subscription_plan",
    "data_type": "USER-DEFINED",
    "column_default": "'basic'::subscription_plan",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "email",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": 255,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "phone",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 20,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "address",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "city",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "state",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "country",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "postal_code",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 20,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "is_verified",
    "data_type": "boolean",
    "column_default": "false",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_profiles",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "uuid_generate_v4()",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "hotel_id",
    "data_type": "uuid",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "role",
    "data_type": "USER-DEFINED",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "permissions",
    "data_type": "jsonb",
    "column_default": "'{}'::jsonb",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "is_active",
    "data_type": "boolean",
    "column_default": "true",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "hotel_staff",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "how_it_works_section",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('how_it_works_section_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "how_it_works_section",
    "column_name": "website_content_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "how_it_works_section",
    "column_name": "heading",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "how_it_works_section",
    "column_name": "subheading",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "how_it_works_section",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "journey_section",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('journey_section_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "journey_section",
    "column_name": "about_section_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "journey_section",
    "column_name": "image",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "journey_section",
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "journey_section",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "id",
    "data_type": "uuid",
    "column_default": "uuid_generate_v4()",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "user_id",
    "data_type": "uuid",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "partner_type",
    "data_type": "USER-DEFINED",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "company_name",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 200,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "website",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": 255,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "description",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "verified_by",
    "data_type": "uuid",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "is_verified",
    "data_type": "boolean",
    "column_default": "false",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partner_profiles",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partners",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('partners_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "partners",
    "column_name": "partners_section_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "partners",
    "column_name": "name",
    "data_type": "character varying",
    "column_default": null,
    "is_nullable": "NO",
    "character_maximum_length": 100,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partners",
    "column_name": "logo_url",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partners",
    "column_name": "website_url",
    "data_type": "text",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partners",
    "column_name": "sort_order",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "partners",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "column_default": "now()",
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "partners_section",
    "column_name": "id",
    "data_type": "integer",
    "column_default": "nextval('partners_section_id_seq'::regclass)",
    "is_nullable": "NO",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "partners_section",
    "column_name": "website_content_id",
    "data_type": "integer",
    "column_default": null,
    "is_nullable": "YES",
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  }
]