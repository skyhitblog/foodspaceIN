/**
 * Created on 13/06/2018.
 */

import WPAPI from "wpapi";
import {Config} from "@common";

var wpAPI = new WPAPI({
    endpoint: Config.WooCommerce.url + '/wp-json'
});

export default wpAPI;
