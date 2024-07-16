import * as R from "remeda";

const data = { aa: [{ zz: { a: [{ data: "hihi" }] } }] };
const data2 = R.pathOr(data, ["aa", 0, "zz", 0, "a", 0, "data"], false); /*?*/

R.swapIndices([1, 2, 3, 4, 5], 0, 3); /*?*/
R.pipe(
  [1, 2, 2, 3, 3, 4, 5, 6],
  R.tap((value) => console.log(`Got ${value}`)),
  R.unique(),
  R.take(3),
); /*?*/
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* eslint-disable */
export type PlanPlace = {
  user?: {
    data?: {
      id?: number;
      attributes?: {
        username?: string;
        email?: string;
        provider?: string;
        resetPasswordToken?: string;
        confirmationToken?: string;
        confirmed?: boolean;
        blocked?: boolean;
        role?: {
          data?: {
            id?: number;
            attributes?: {
              name?: string;
              description?: string;
              type?: string;
              permissions?: {
                data?: Array<{
                  id?: number;
                  attributes?: {
                    action?: string;
                    role?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: number;
                        attributes?: {
                          firstname?: string;
                          lastname?: string;
                          username?: string;
                          email?: string;
                          resetPasswordToken?: string;
                          registrationToken?: string;
                          isActive?: boolean;
                          roles?: {
                            data?: Array<{
                              id?: number;
                              attributes?: {
                                name?: string;
                                code?: string;
                                description?: string;
                                users?: {
                                  data?: Array<{
                                    id?: number;
                                    attributes?: any;
                                  }>;
                                };
                                permissions?: {
                                  data?: Array<{
                                    id?: number;
                                    attributes?: {
                                      action?: string;
                                      actionParameters?: any;
                                      subject?: string;
                                      properties?: any;
                                      conditions?: any;
                                      role?: {
                                        data?: {
                                          id?: number;
                                          attributes?: any;
                                        };
                                      };
                                      createdAt?: string;
                                      updatedAt?: string;
                                      createdBy?: {
                                        data?: {
                                          id?: number;
                                          attributes?: any;
                                        };
                                      };
                                      updatedBy?: {
                                        data?: {
                                          id?: number;
                                          attributes?: any;
                                        };
                                      };
                                    };
                                  }>;
                                };
                                createdAt?: string;
                                updatedAt?: string;
                                createdBy?: {
                                  data?: {
                                    id?: number;
                                    attributes?: any;
                                  };
                                };
                                updatedBy?: {
                                  data?: {
                                    id?: number;
                                    attributes?: any;
                                  };
                                };
                              };
                            }>;
                          };
                          blocked?: boolean;
                          preferedLanguage?: string;
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                        };
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                  };
                }>;
              };
              users?: {
                data?: Array<{
                  id?: number;
                  attributes?: any;
                }>;
              };
              createdAt?: string;
              updatedAt?: string;
              createdBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              updatedBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
            };
          };
        };
        profile_image?: {
          data?: {
            id?: number;
            attributes?: {
              name?: string;
              alternativeText?: string;
              caption?: string;
              width?: number;
              height?: number;
              formats?: any;
              hash?: string;
              ext?: string;
              mime?: string;
              size?: number;
              url?: string;
              previewUrl?: string;
              provider?: string;
              provider_metadata?: any;
              related?: {
                data?: Array<{
                  id?: number;
                  attributes?: any;
                }>;
              };
              folder?: {
                data?: {
                  id?: number;
                  attributes?: {
                    name?: string;
                    pathId?: number;
                    parent?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                    children?: {
                      data?: Array<{
                        id?: number;
                        attributes?: any;
                      }>;
                    };
                    files?: {
                      data?: Array<{
                        id?: number;
                        attributes?: {
                          name?: string;
                          alternativeText?: string;
                          caption?: string;
                          width?: number;
                          height?: number;
                          formats?: any;
                          hash?: string;
                          ext?: string;
                          mime?: string;
                          size?: number;
                          url?: string;
                          previewUrl?: string;
                          provider?: string;
                          provider_metadata?: any;
                          related?: {
                            data?: Array<{
                              id?: number;
                              attributes?: any;
                            }>;
                          };
                          folder?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          folderPath?: string;
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                        };
                      }>;
                    };
                    path?: string;
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                  };
                };
              };
              folderPath?: string;
              createdAt?: string;
              updatedAt?: string;
              createdBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              updatedBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
            };
          };
        };
        nickname?: string;
        eventAgreed?: boolean;
        profile_image_url?: string;
        writeBlocked?: boolean;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: {
          data?: {
            id?: number;
            attributes?: any;
          };
        };
        updatedBy?: {
          data?: {
            id?: number;
            attributes?: any;
          };
        };
      };
    };
  };
  plan_day?: {
    data?: {
      id?: number;
      attributes?: {
        user?: {
          data?: {
            id?: number;
            attributes?: any;
          };
        };
        plan?: {
          data?: {
            id?: number;
            attributes?: {
              user?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              title?: string;
              start?: string;
              end?: string;
              plan_days?: {
                data?: Array<{
                  id?: number;
                  attributes?: any;
                }>;
              };
              createdAt?: string;
              updatedAt?: string;
              publishedAt?: string;
              createdBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              updatedBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
            };
          };
        };
        day_number?: number;
        date?: string;
        plan_places?: {
          data?: Array<{
            id?: number;
            attributes?: {
              user?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              plan_day?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              content?: string;
              sort?: number;
              spot?: {
                data?: {
                  id?: number;
                  attributes?: {
                    title?: string;
                    menu_code?: string;
                    category?: {
                      data?: Array<{
                        id?: number;
                        attributes?: {
                          name?: string;
                          menu_code?: string;
                          parent?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          level?: number;
                          sort?: number;
                          main_fix?: boolean;
                          finder_yn?: boolean;
                          filter_yn?: boolean;
                          code?: number;
                          createdAt?: string;
                          updatedAt?: string;
                          publishedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                        };
                      }>;
                    };
                    address?: string;
                    area_category?: {
                      data?: {
                        id?: number;
                        attributes?: {
                          name?: string;
                          latitude?: number;
                          longitude?: number;
                          sort?: number;
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                        };
                      };
                    };
                    latitude?: number;
                    longitude?: number;
                    use_time?: string;
                    break_time?: string;
                    phone?: string;
                    entrance_fee?: string;
                    total_distance?: string;
                    take_time?: string;
                    height?: string;
                    start_end_point?: string;
                    toilet?: string;
                    rental_goods?: string;
                    shower?: string;
                    operate_day?: string;
                    homepage?: string;
                    description?: string;
                    keyword?: Array<{
                      id?: number;
                      name?: string;
                    }>;
                    blog_keyword?: string;
                    port?: Array<{
                      id?: number;
                      title?: string;
                      phone?: string;
                      latitude?: number;
                      longitude?: number;
                      address?: string;
                    }>;
                    menu?: Array<{
                      id?: number;
                      title?: string;
                      price?: string;
                      price_n?: number;
                      sub_comment?: string;
                      main_yn?: boolean;
                    }>;
                    menu_images?: {
                      data?: Array<{
                        id?: number;
                        attributes?: {
                          name?: string;
                          alternativeText?: string;
                          caption?: string;
                          width?: number;
                          height?: number;
                          formats?: any;
                          hash?: string;
                          ext?: string;
                          mime?: string;
                          size?: number;
                          url?: string;
                          previewUrl?: string;
                          provider?: string;
                          provider_metadata?: any;
                          related?: {
                            data?: Array<{
                              id?: number;
                              attributes?: any;
                            }>;
                          };
                          folder?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          folderPath?: string;
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                        };
                      }>;
                    };
                    images?: {
                      data?: Array<{
                        id?: number;
                        attributes?: {
                          name?: string;
                          alternativeText?: string;
                          caption?: string;
                          width?: number;
                          height?: number;
                          formats?: any;
                          hash?: string;
                          ext?: string;
                          mime?: string;
                          size?: number;
                          url?: string;
                          previewUrl?: string;
                          provider?: string;
                          provider_metadata?: any;
                          related?: {
                            data?: Array<{
                              id?: number;
                              attributes?: any;
                            }>;
                          };
                          folder?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          folderPath?: string;
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                        };
                      }>;
                    };
                    videoLink?: Array<{
                      id?: number;
                      videoUrl?: string;
                      title?: string;
                      image?: {
                        data?: {
                          id?: number;
                          attributes?: {
                            name?: string;
                            alternativeText?: string;
                            caption?: string;
                            width?: number;
                            height?: number;
                            formats?: any;
                            hash?: string;
                            ext?: string;
                            mime?: string;
                            size?: number;
                            url?: string;
                            previewUrl?: string;
                            provider?: string;
                            provider_metadata?: any;
                            related?: {
                              data?: Array<{
                                id?: number;
                                attributes?: any;
                              }>;
                            };
                            folder?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                            folderPath?: string;
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                          };
                        };
                      };
                    }>;
                    parkingArea?: Array<{
                      id?: number;
                      title?: string;
                      images?: {
                        data?: Array<{
                          id?: number;
                          attributes?: {
                            name?: string;
                            alternativeText?: string;
                            caption?: string;
                            width?: number;
                            height?: number;
                            formats?: any;
                            hash?: string;
                            ext?: string;
                            mime?: string;
                            size?: number;
                            url?: string;
                            previewUrl?: string;
                            provider?: string;
                            provider_metadata?: any;
                            related?: {
                              data?: Array<{
                                id?: number;
                                attributes?: any;
                              }>;
                            };
                            folder?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                            folderPath?: string;
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                          };
                        }>;
                      };
                      videoLink?: Array<{
                        id?: number;
                        videoUrl?: string;
                        title?: string;
                        image?: {
                          data?: {
                            id?: number;
                            attributes?: {
                              name?: string;
                              alternativeText?: string;
                              caption?: string;
                              width?: number;
                              height?: number;
                              formats?: any;
                              hash?: string;
                              ext?: string;
                              mime?: string;
                              size?: number;
                              url?: string;
                              previewUrl?: string;
                              provider?: string;
                              provider_metadata?: any;
                              related?: {
                                data?: Array<{
                                  id?: number;
                                  attributes?: any;
                                }>;
                              };
                              folder?: {
                                data?: {
                                  id?: number;
                                  attributes?: any;
                                };
                              };
                              folderPath?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: number;
                                  attributes?: any;
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: number;
                                  attributes?: any;
                                };
                              };
                            };
                          };
                        };
                      }>;
                      latitude?: number;
                      longitude?: number;
                      address?: string;
                    }>;
                    coursePoint?: Array<{
                      id?: number;
                      title?: string;
                      latitude?: number;
                      longitude?: number;
                    }>;
                    spot?: Array<{
                      id?: number;
                      description?: string;
                      spot?: {
                        data?: {
                          id?: number;
                          attributes?: any;
                        };
                      };
                    }>;
                    course_map?: any;
                    view_count?: number;
                    broadcast_info?: string;
                    wish_count?: number;
                    review_count?: number;
                    minimap?: Array<{
                      id?: number;
                      images?: {
                        data?: Array<{
                          id?: number;
                          attributes?: {
                            name?: string;
                            alternativeText?: string;
                            caption?: string;
                            width?: number;
                            height?: number;
                            formats?: any;
                            hash?: string;
                            ext?: string;
                            mime?: string;
                            size?: number;
                            url?: string;
                            previewUrl?: string;
                            provider?: string;
                            provider_metadata?: any;
                            related?: {
                              data?: Array<{
                                id?: number;
                                attributes?: any;
                              }>;
                            };
                            folder?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                            folderPath?: string;
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: number;
                                attributes?: any;
                              };
                            };
                          };
                        }>;
                      };
                      videoLink?: Array<{
                        id?: number;
                        videoUrl?: string;
                        title?: string;
                        image?: {
                          data?: {
                            id?: number;
                            attributes?: {
                              name?: string;
                              alternativeText?: string;
                              caption?: string;
                              width?: number;
                              height?: number;
                              formats?: any;
                              hash?: string;
                              ext?: string;
                              mime?: string;
                              size?: number;
                              url?: string;
                              previewUrl?: string;
                              provider?: string;
                              provider_metadata?: any;
                              related?: {
                                data?: Array<{
                                  id?: number;
                                  attributes?: any;
                                }>;
                              };
                              folder?: {
                                data?: {
                                  id?: number;
                                  attributes?: any;
                                };
                              };
                              folderPath?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: number;
                                  attributes?: any;
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: number;
                                  attributes?: any;
                                };
                              };
                            };
                          };
                        };
                      }>;
                      latitude?: number;
                      longitude?: number;
                      comment?: string;
                      title?: string;
                      navi_yn?: boolean;
                    }>;
                    reference_id?: string;
                    use_time_g?: Array<{
                      id?: number;
                      name?: string;
                      free_text?: string;
                      use_time_n?: Array<{
                        id?: number;
                        day_week?: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN' | 'D';
                        start?: string;
                        end?: string;
                        last_order?: string;
                        comment?: string;
                        break_start_1?: string;
                        break_end_1?: string;
                        break_start_2?: string;
                        break_end_2?: string;
                        break_start_3?: string;
                        break_end_3?: string;
                      }>;
                    }>;
                    total_distance_n?: number;
                    take_time_n?: number;
                    height_n?: number;
                    height_rank?: number;
                    toilet_comment?: string;
                    shower_n?: 'N' | 'Y' | 'WY';
                    operate_day_n?: string;
                    operate_day_c?: Array<{
                      id?: number;
                      start?: string;
                      end?: string;
                    }>;
                    amenities?: Array<{
                      id?: number;
                      code?: string;
                    }>;
                    toilet_n?: 'Y' | 'N';
                    cctv?: {
                      data?: {
                        id?: number;
                        attributes?: {
                          title?: string;
                          latitude?: number;
                          longitude?: number;
                          cctv_url?: string;
                          sea_yn?: boolean;
                          spot?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          createdAt?: string;
                          updatedAt?: string;
                          publishedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: number;
                              attributes?: any;
                            };
                          };
                        };
                      };
                    };
                    createdAt?: string;
                    updatedAt?: string;
                    publishedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: number;
                        attributes?: any;
                      };
                    };
                  };
                };
              };
              place_title?: string;
              place_address?: string;
              place_latitude?: number;
              place_longitude?: number;
              place_link?: string;
              place_id?: string;
              createdAt?: string;
              updatedAt?: string;
              publishedAt?: string;
              createdBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
              updatedBy?: {
                data?: {
                  id?: number;
                  attributes?: any;
                };
              };
            };
          }>;
        };
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
        createdBy?: {
          data?: {
            id?: number;
            attributes?: any;
          };
        };
        updatedBy?: {
          data?: {
            id?: number;
            attributes?: any;
          };
        };
      };
    };
  };
  content?: string;
  sort?: number;
  spot?: {
    data?: {
      id?: number;
      attributes?: any;
    };
  };
  place_title?: string;
  place_address?: string;
  place_latitude?: number;
  place_longitude?: number;
  place_link?: string;
  place_id?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: {
    data?: {
      id?: number;
      attributes?: any;
    };
  };
  updatedBy?: {
    data?: {
      id?: number;
      attributes?: any;
    };
  };
};


const d = {
  a: {
    c: {
      name: "dd",
    },
  },
};
R.setPath(d, ["a", "c", "name"], "fuck"); /*?*/
