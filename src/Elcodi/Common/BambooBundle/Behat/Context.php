<?php

/*
 * This file is part of the Elcodi package.
 *
 * Copyright (c) 2014-2015 Elcodi.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Feel free to edit as you please, and have fun.
 *
 * @author Marc Morera <yuhu@mmoreram.com>
 * @author Aldo Chiecchia <zimage@tiscali.it>
 * @author Elcodi Team <tech@elcodi.com>
 */

namespace Elcodi\Common\BambooBundle\Behat;

use Behat\Mink\Exception\ElementHtmlException;
use Behat\Mink\Exception\ElementNotFoundException;

use Elcodi\Common\BambooBundle\Behat\abstracts\AbstractElcodiContext;

/**
 * Class Context
 */
class Context extends AbstractElcodiContext
{
    /**
     * @When /^the page contains a "(?P<value>[^"]*)" test attribute$/
     * @Then /^the response should contain a "(?P<value>[^"]*)" test attribute$/
     */
    public function responseShouldContainTestAttribute($value)
    {
        $session = $this
            ->getSession();

        $page = $session
            ->getPage();

        $testAttribute = $page
            ->find(
                'xpath',
                "//*[@data-test='$value']"
            );

        if ($testAttribute == null) {
            throw new ElementNotFoundException(
                $session
            );
        }
    }

    /**
     * @When /^the page does not contain a "(?P<value>[^"]*)" test attribute$/
     * @Then /^the response should not contain a "(?P<value>[^"]*)" test attribute$/
     */
    public function responseShouldNotContainTestAttribute($value)
    {
        $session = $this
            ->getSession();

        $page = $session
            ->getPage();

        $testAttribute = $page
            ->find(
                'xpath',
                "//*[@data-test='$value']"
            );

        if ($testAttribute !== null) {
            throw new ElementHtmlException(
                "Found element attribute with value: $value",
                $session,
                $testAttribute
            );
        }
    }
}
