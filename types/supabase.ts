export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      albums: {
        Row: {
          album_id: number
          album_name: string
          artist_id: number | null
          cover_image_url: string | null
          genre_id: number | null
          release_year: number | null
        }
        Insert: {
          album_id?: number
          album_name: string
          artist_id?: number | null
          cover_image_url?: string | null
          genre_id?: number | null
          release_year?: number | null
        }
        Update: {
          album_id?: number
          album_name?: string
          artist_id?: number | null
          cover_image_url?: string | null
          genre_id?: number | null
          release_year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "albums_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["artist_id"]
          },
          {
            foreignKeyName: "albums_genre_id_fkey"
            columns: ["genre_id"]
            referencedRelation: "genres"
            referencedColumns: ["genre_id"]
          }
        ]
      }
      artists: {
        Row: {
          artist_id: number
          artist_name: string
        }
        Insert: {
          artist_id?: number
          artist_name: string
        }
        Update: {
          artist_id?: number
          artist_name?: string
        }
        Relationships: []
      }
      genre_artists: {
        Row: {
          artist_id: number
          genre_id: number
        }
        Insert: {
          artist_id: number
          genre_id: number
        }
        Update: {
          artist_id?: number
          genre_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "genre_artists_artist_id_fkey"
            columns: ["artist_id"]
            referencedRelation: "artists"
            referencedColumns: ["artist_id"]
          },
          {
            foreignKeyName: "genre_artists_genre_id_fkey"
            columns: ["genre_id"]
            referencedRelation: "genres"
            referencedColumns: ["genre_id"]
          }
        ]
      }
      genres: {
        Row: {
          genre_id: number
          genre_name: string
          parent_genre_id: number | null
        }
        Insert: {
          genre_id?: number
          genre_name: string
          parent_genre_id?: number | null
        }
        Update: {
          genre_id?: number
          genre_name?: string
          parent_genre_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "genres_parent_genre_id_fkey"
            columns: ["parent_genre_id"]
            referencedRelation: "genres"
            referencedColumns: ["genre_id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          album_id: number
          created_at: string
          dislikes_count: number
          id: number
          likes_count: number
          review_rating: number
          review_summary: string | null
          review_text: string | null
          user_id: string
        }
        Insert: {
          album_id: number
          created_at?: string
          dislikes_count?: number
          id?: number
          likes_count?: number
          review_rating: number
          review_summary?: string | null
          review_text?: string | null
          user_id: string
        }
        Update: {
          album_id?: number
          created_at?: string
          dislikes_count?: number
          id?: number
          likes_count?: number
          review_rating?: number
          review_summary?: string | null
          review_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_album_id_fkey"
            columns: ["album_id"]
            referencedRelation: "albums"
            referencedColumns: ["album_id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
